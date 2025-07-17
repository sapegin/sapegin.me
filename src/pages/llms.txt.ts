import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '../constants';

function getMarkdownLinkList(
	entries: {
		slug: string;
		data: { title: string; description?: string };
	}[],
	section: string
) {
	return entries
		.map(
			(entry) =>
				`- [${entry.data.title}](${SITE_URL}/${section}/${entry.slug}.html.md): ${entry.data.description ?? ''}`
		)
		.join('\n');
}

/**
 * All blog content in Markdown format for LLMs
 * https://llmstxt.org/
 */
export const GET: APIRoute = async () => {
	const blogPosts = await getCollection(
		'blog',
		// Skip book chapters, as we show them in a separate list
		(x) => x.data.source === undefined
	);
	const sortedBlogPosts = blogPosts.toSorted(
		(a, b) => b.data.date.getTime() - a.data.date.getTime()
	);

	const bookChapters = await getCollection('bookChapters');
	const sortedBookChapters = bookChapters.toSorted((a, b) =>
		a.data.source.localeCompare(b.data.source)
	);

	const content = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

## Blog

${getMarkdownLinkList(sortedBlogPosts, 'blog')}

## Washing your code: a book on clean code for frontend developers

${getMarkdownLinkList(sortedBookChapters, 'book')}

`;
	return new Response(content, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
