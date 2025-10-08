// Get Markdown from the Washing code book repo

// TODO: Make a map of all sections with an ID and validate all chapter links

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { globSync } from 'glob';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import _ from 'lodash';
import { SITE_URL } from '../src/constants.ts';
import { upperFirst } from '../src/util/upperFirst.ts';

interface Post {
	title: string;
	source?: string;
	file: string;
	contents: string;
	url: string;
}

interface BookPost extends Post {
	source: string;
	sourceContents: string;
}

interface TocItem {
	url?: string;
	title: string;
	description: string;
	sections: string[];
}

const REPO_TAR_GZ =
	'https://codeload.github.com/sapegin/washingcode-book/tar.gz/master';
const REPO_DIR = 'washingcode-book-master';
const BLOG_CONTENT_DIR = 'src/content/blog';
export const BOOK_CONTENT_DIR = 'src/content/bookChapters';
const DATA_DIR = 'src/data';

const TIPS = {
	I: 'Info',
	W: 'Warning',
	E: 'Error',
	T: 'Tip',
} as const;

const slugger = new GithubSlugger();

const read = (file: string) => fs.readFileSync(file, 'utf8');

const readChapter = (file: string) => read(`${REPO_DIR}/manuscript/${file}.md`);

const getFrontmatter = (contents: string) =>
	contents.match(/^---[\S\s]*?---/)?.[0];

const getPostTitle = (post: Post) =>
	upperFirst(post.title.replace('Washing your code: ', ''));

const getSlug = (file: string) =>
	`${file.replace(/^src\/content\/blog\//, '').replace(/\.md$/, '')}`;

const getUrl = (file: string) => `/blog/${getSlug(file)}/`;

const getMainId = (contents: string) => contents.match(/{#(.*)}/m)?.[1] ?? '';

const stripIds = (contents: string) =>
	contents.replaceAll(/\n?{#[^\n]+}\n$/gm, '');

const stripTitle = (contents: string) => contents.replace(/^#+ .*$/m, '');

const getTitle = (contents: string) => contents.match(/^#+ (.*?)$/m)?.[1] ?? '';

const getDescription = (contents: string) =>
	contents.match(/<!-- description:\s+(.*?)\s+-->/)?.[1] ?? false;

const getSections = (contents: string) => [
	...(contents.match(/(?<=\n##\s+)([^\n]+)/gm) ?? []),
];

const shouldIncludeSections = (contents: string) =>
	/<!-- show-sections: true -->/.test(contents);

const downgradeHeadings = (contents: string) =>
	contents.replaceAll(/^##(#+) /gm, '$1 ');

const removeHtmlComments = (contents: string) =>
	contents.replaceAll(/<!--[\s\S]*?-->/g, '');

const updateLinks = (contents: string) =>
	contents.replaceAll(/\[(.*?)]\(#(.*?)\)/g, (_match, title, anchor) => {
		const href = internalLinks[anchor];
		if (href) {
			return `[${title}](${href})`;
		}

		console.error(`[BOOK] 🦀 Cannot generate link to #${anchor}`);
		return title;
	});

const stripInternalLinks = (contents: string) =>
	contents.replaceAll(/\[(.*?)]\(#(.*?)\)/g, (_match, title) => {
		return title;
	});

const updateTips = (contents: string) => {
	const keysMask = Object.keys(TIPS).join('');
	return (
		contents
			// Replace paragraph breaks inside tips with double <br>
			.replaceAll(
				new RegExp(`\\s*([${keysMask}])>\\s*([${keysMask}])>\\s*`, 'gm'),
				'<br><br>'
			)
			// Replace the first tip marker in a block with a text marker (**Info:**)
			.replaceAll(
				new RegExp(`\\n([${keysMask}])> `, 'gm'),
				(_match, marker: keyof typeof TIPS) => {
					return `\n**${TIPS[marker]}:** `;
				}
			)
	);
};

// images/ → /images/blog/book/
const updateImages = (contents: string) =>
	contents.replaceAll('](images/', '](/images/blog/book/');

// images/ → https://sapegin.me/images/blog/book/
const updateImagesAbsolute = (contents: string) =>
	contents.replaceAll('](images/', `](${SITE_URL}/images/blog/book/`);

// Get an array from a tagged list:
// <!-- patterns:start -->
// - [Foo](#foo).
// - [Bar](#bar).
// <!-- patterns:end -->
// →
// ['Foo', 'Bar']
const getTaggedList = (contents: string, tag: string) => {
	// Get Markdown between tag comments
	const [, markdown] =
		contents.match(
			new RegExp(
				`<!-- ${tag}:start -->\\s*([\\S\\s]*)\\s*<!-- ${tag}:end -->`,
				'm'
			)
		) ?? [];

	// Remove the markup and split into an array
	return markdown
		.replaceAll(/- \[([^\]]+)]\([^)]+\).*\.?/g, '$1')
		.trim()
		.split('\n');
};

/**
 * Download the code
 */
console.log('[BOOK] Downloading source files...');

fs.rmSync(REPO_DIR, { recursive: true, force: true });
execSync(`curl "${REPO_TAR_GZ}" | tar xz`);

/**
 * Read files
 */
console.log();
console.log('[BOOK] Reading files...');

const files = globSync(`${BLOG_CONTENT_DIR}/*.md`);
const allPosts: Post[] = files.map((filepath) => {
	const contents = read(filepath);
	const post = matter(contents);
	return {
		title: post.data.title as string,
		source: post.data.source as string | undefined,
		url: getUrl(filepath),
		file: filepath,
		contents,
	};
});

const bookPosts: BookPost[] = allPosts
	.filter((x) => x.source?.startsWith('washing-code/'))
	.map((x) => {
		const source = (x.source ?? '').replace('washing-code/', '');
		return {
			...x,
			source,
			sourceContents: readChapter(source),
		};
	})
	.toSorted((b, a) => b.source.localeCompare(a.source));

/**
 * Collect internal links
 */
console.log();
console.log('[BOOK] Collecting links...');

const internalLinks: Record<string, string> = {};
for (const post of bookPosts) {
	slugger.reset();

	// Store link to the post itself
	const mainLink = post.url;
	const mainLinkId = getMainId(post.sourceContents);
	internalLinks[mainLinkId] = mainLink;

	// Store all internal links
	const sectionIds = post.sourceContents.match(/\n{#(.*)}\n\n##+(.*)/gm) ?? [];
	for (const match of sectionIds) {
		// Get the original ID and a section title
		const [, id, title] = match.match(/{#(.*)}\n\n##+\s*(.*)/) ?? [];

		// Link to a blog post using internal IDs (from rehype-slug)
		internalLinks[id] = `${mainLink}#${slugger.slug(title)}`;
	}
}

/**
 * Sync files
 */
console.log();
console.log('[BOOK] Syncing files...');

const postLinks: Record<string, string> = {};

for (const post of bookPosts) {
	console.log(`[BOOK] 👉 ${post.file}`);

	const chapterFile = post.source.replace('washing-code/', '');

	postLinks[chapterFile] = post.url;

	const chapterContentsRaw = readChapter(chapterFile);
	const chapterContents = _.flow(
		updateImages,
		stripIds,
		stripTitle,
		downgradeHeadings,
		updateLinks,
		updateTips
	)(chapterContentsRaw);

	const otherChapters = bookPosts
		.map((p) =>
			p.file === post.file
				? `- _${getPostTitle(p)} (*this post*)_`
				: `- [${getPostTitle(p)}](${p.url})`
		)
		.join('\n');

	const contents = `${getFrontmatter(post.contents)}

${chapterContents.trim()}

---

Read other sample chapters of the book:

${otherChapters}
`;

	fs.writeFileSync(post.file, contents);
}

/**
 * Generate table of contents
 */
console.log();
console.log('[BOOK] Syncing table of contents...');

const toc: TocItem[] = [];

const tocRaw = read(`${REPO_DIR}/manuscript/Book.txt`);
const tocLines = tocRaw.split('\n').filter((x) => x.trim());

for (const line of tocLines) {
	const fileName = line.replace(/\.md$/, '');
	const content = readChapter(fileName);
	const description = getDescription(content);
	if (description === false) {
		continue;
	}

	const title = getTitle(stripIds(content));
	const sections = shouldIncludeSections(content) ? getSections(content) : [];

	toc.push({
		url: postLinks[fileName],
		title,
		description,
		sections,
	});
}

// Move Other techniques chapter to the end
const tocSorted = _.sortBy(toc, ({ title }) =>
	title === 'Other techniques' ? 1 : -1
);

console.log('[BOOK] Syncing patterns and antipatterns...');

// Read footer chapter
const footerMarkdown = readChapter('160_Footer');

// Get patterns and antipatterns
const patterns = getTaggedList(footerMarkdown, 'patterns');
const antipatterns = getTaggedList(footerMarkdown, 'antipatterns');

fs.writeFileSync(
	`${DATA_DIR}/book.json`,
	JSON.stringify(
		{
			chapters: tocSorted,
			patterns,
			antipatterns,
		},
		undefined,
		2
	)
);

console.log('[BOOK] Generate files for LLMs.txt...');
const chapters = globSync(`${REPO_DIR}/manuscript/*.md`);

fs.mkdirSync(BOOK_CONTENT_DIR, { recursive: true });

for (const chapterFile of chapters) {
	// Skip non-content chapters
	if (
		chapterFile.endsWith('_Footer.md') ||
		chapterFile.endsWith('_Header.md')
	) {
		continue;
	}

	console.log(`[BOOK] 👉 ${chapterFile}`);

	const filename = path.basename(chapterFile, '.md');
	const slug = _.kebabCase(filename.replace(/^[\d]+_/, ''));
	const chapterContentsRaw = read(chapterFile);
	const title = getTitle(stripIds(chapterContentsRaw));
	const description = getDescription(chapterContentsRaw);

	const chapterContents = _.flow(
		updateImagesAbsolute,
		updateTips,
		stripIds,
		stripTitle,
		removeHtmlComments,
		downgradeHeadings,
		stripInternalLinks
	)(chapterContentsRaw);

	const markdown = `
---
title: '${title}'
description: 'A chapter from “Washing your code. A book on clean code for frontend developers” by Artem Sapegin. ${description}'
source: washing-code/${filename}
---

${chapterContents}
	`;

	fs.writeFileSync(`${BOOK_CONTENT_DIR}/${slug}.md`, markdown);
}

console.log('[BOOK] Formatting...');

execSync(`prettier --log-level warn --write "${BLOG_CONTENT_DIR}/**/*.md"`);
execSync(`prettier --log-level warn --write "${BOOK_CONTENT_DIR}/**/*.md"`);

console.log('[BOOK] Done 🦜');
