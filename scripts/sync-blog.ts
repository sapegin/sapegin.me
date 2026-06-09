#!/usr/bin/env node

/**
 * Sync blog posts from Obsidian vault to Markdown files for Astro.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
import {
	extractTitle,
	formatMarkdown,
	formatMarkdownImage,
	formatPublishedDate,
	hasTag,
	isNewer,
	parsePublishedDate,
	readNoteFile,
	resolveWikilinks,
	stripTitle,
} from '../shared/sync/obsidian.ts';

const VAULT_DIR = path.join(os.homedir(), 'murder', '🌐 Blog');
const ATTACHMENTS_DIR = path.join(os.homedir(), 'murder', 'attachments');
const OUTPUT_DIR = 'content/blog';
const IMAGES_DIR = path.join('sites/sapegin.me/public/images/blog');

const EMOJI_SEQUENCE_REGEXP =
	/\p{Extended_Pictographic}(?:\p{Emoji_Modifier}|\uFE0F|\u200D\p{Extended_Pictographic})*/gu;

interface BlogFrontmatter extends Record<string, unknown> {
	description?: string;
	published?: string | Date;
	slug?: string;
	status?: string;
	tags?: string[];
}

function getImagePublicPath(filename: string) {
	return `/images/blog/${filename}`;
}

function copyImage(filename: string) {
	const sourcePath = path.join(ATTACHMENTS_DIR, filename);
	if (fs.existsSync(sourcePath) === false) {
		console.warn(`⚠️  Image not found: ${sourcePath}`);
		return;
	}

	const destPath = path.join(IMAGES_DIR, filename);
	fs.mkdirSync(path.dirname(destPath), { recursive: true });

	if (isNewer(sourcePath, destPath)) {
		fs.copyFileSync(sourcePath, destPath);
	}
}

function resolveImageEmbeds(content: string) {
	let updated = content.replaceAll(
		/\[!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]\]\(([^)]+)\)/g,
		(_match, filename: string, alt: string | undefined, linkTarget: string) => {
			copyImage(filename);
			const imageMarkdown = formatMarkdownImage(
				getImagePublicPath(filename),
				alt !== undefined && alt.length > 0 ? alt : undefined
			);
			return `[${imageMarkdown}](${linkTarget})`;
		}
	);

	updated = updated.replaceAll(
		/(?<!\[)!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g,
		(_match, filename: string, alt: string | undefined) => {
			copyImage(filename);
			return formatMarkdownImage(
				getImagePublicPath(filename),
				alt !== undefined && alt.length > 0 ? alt : undefined
			);
		}
	);

	return updated;
}

function rewriteSiteUrls(content: string) {
	return content
		.replaceAll(/\]\((?:https?:)?\/\/sapegin\.me\/?\)/g, '](/)')
		.replaceAll(/\]\((?:https?:)?\/\/sapegin\.me(\/[^)]*)\)/g, ']($1)');
}

function wrapEmojisInLine(line: string) {
	return line.replaceAll(EMOJI_SEQUENCE_REGEXP, (emoji) => {
		return `<span aria-hidden="true">${emoji}</span>`;
	});
}

function wrapEmojisInAriaHidden(content: string) {
	const lines = content.split('\n');
	let inFence = false;

	return lines
		.map((line) => {
			if (line.trimStart().startsWith('```')) {
				inFence = inFence === false;
				return line;
			}

			if (inFence) {
				return line;
			}

			return wrapEmojisInLine(line);
		})
		.join('\n');
}

function transformBody(content: string, slugMap: Map<string, string>) {
	const withoutTitle = stripTitle(content);

	return wrapEmojisInAriaHidden(
		rewriteSiteUrls(
			resolveWikilinks(
				resolveImageEmbeds(withoutTitle),
				slugMap,
				(slug) => `/blog/${slug}/`
			)
		)
	);
}

function isWashingcodeFile(filePath: string) {
	const rawMarkdown = fs.readFileSync(filePath, 'utf8').trimStart();
	const { data } = matter(rawMarkdown);
	return hasTag(data, 'washingcode');
}

console.log('📝 Syncing blog from Obsidian vault…\n');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

const files = fs
	.readdirSync(VAULT_DIR)
	.filter((filename) => filename.endsWith('.md'));

console.log(`Found ${files.length} notes in vault\n`);

const slugMap = new Map<string, string>();
const publishedFiles: string[] = [];

for (const filename of files) {
	const filePath = path.join(VAULT_DIR, filename);
	const { frontmatter, baseName, slug } = readNoteFile<BlogFrontmatter>(
		filePath,
		(noteFrontmatter) => {
			if (typeof noteFrontmatter.slug !== 'string') {
				throw new TypeError(`Missing slug in ${filename}`);
			}

			return noteFrontmatter.slug;
		}
	);

	if (frontmatter.status !== 'published') {
		continue;
	}

	if (parsePublishedDate(frontmatter.published) === undefined) {
		console.warn(`⚠️  No published date in ${filename}, skipping`);
		continue;
	}

	slugMap.set(baseName, slug);
	publishedFiles.push(filePath);
}

console.log(`Found ${publishedFiles.length} published posts\n`);

let synced = 0;

for (const filePath of publishedFiles) {
	const { frontmatter, content, slug } = readNoteFile<BlogFrontmatter>(
		filePath,
		(noteFrontmatter) => noteFrontmatter.slug as string
	);

	const title = extractTitle(content);
	if (title === '') {
		console.warn(`⚠️  No H1 title found in ${filePath}, skipping`);
		continue;
	}

	const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);
	if (isNewer(filePath, outputPath) === false) {
		continue;
	}

	console.log('👉', title);

	const body = transformBody(content, slugMap);
	const outputMarkdown = formatMarkdown(
		{
			title,
			description: frontmatter.description,
			date: formatPublishedDate(frontmatter.published),
			tags: frontmatter.tags ?? [],
		},
		body
	);

	fs.writeFileSync(outputPath, outputMarkdown);
	console.log(`  ↪ ${outputPath}`);
	synced++;
}

const publishedSlugs = new Set(slugMap.values());
const existingFiles = fs
	.readdirSync(OUTPUT_DIR)
	.filter((filename) => filename.endsWith('.md'));

let deleted = 0;

for (const filename of existingFiles) {
	const slug = path.parse(filename).name;
	const filePath = path.join(OUTPUT_DIR, filename);

	if (publishedSlugs.has(slug) || isWashingcodeFile(filePath)) {
		continue;
	}

	fs.unlinkSync(filePath);
	console.log(`🗑️  Deleted ${slug}`);
	deleted++;
}

console.log();
console.log(`${synced} posts synced, ${deleted} deleted`);

console.log();
console.log('Formatting…');
execSync(`prettier --log-level warn --write "${OUTPUT_DIR}/**/*.md"`);

console.log('Done 🦜');
