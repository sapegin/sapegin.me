import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/** Matches wikilinks: [[target]] or [[target|label]] */
export const WIKILINK_REGEXP = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;

type FrontmatterValue = string | string[] | undefined;

/**
 * Returns true if srcPath is newer than destPath, or destPath doesn't exist.
 */
export function isNewer(srcPath: string, destPath: string): boolean {
	if (fs.existsSync(destPath) === false) {
		return true;
	}

	const srcMtime = fs.statSync(srcPath).mtimeMs;
	const destMtime = fs.statSync(destPath).mtimeMs;
	return srcMtime > destMtime;
}

export function extractTitle(content: string): string {
	const match = content.match(/^# (.+)$/m);
	return match ? match[1].trim() : '';
}

export function stripTitle(content: string): string {
	return content.replace(/^\s*# .+\n\n?/, '');
}

export function getAllWikilinks(markdown: string): string[] {
	const matches = markdown.matchAll(new RegExp(WIKILINK_REGEXP.source, 'g'));
	return [...matches].map((match) => match[1]);
}

export function resolveWikilinks(
	text: string,
	slugMap: Map<string, string>,
	toUrl: (slug: string) => string
): string {
	return text.replaceAll(
		new RegExp(WIKILINK_REGEXP.source, 'g'),
		(_match, target: string, label?: string) => {
			const slug = slugMap.get(target);
			if (slug) {
				return `[${label ?? target}](${toUrl(slug)})`;
			}

			return label ?? target;
		}
	);
}

export function formatMarkdownImage(publicPath: string, alt?: string): string {
	if (alt === undefined || alt.length === 0) {
		return `![](${publicPath})`;
	}

	return `![${alt}](${publicPath})`;
}

export function parsePublishedDate(
	published: string | Date | undefined
): string | undefined {
	if (published instanceof Date) {
		return published.toISOString().slice(0, 10);
	}

	if (typeof published === 'string' && published.trim().length > 0) {
		return published;
	}

	return undefined;
}

export function formatPublishedDate(
	published: string | Date | undefined
): string {
	const date = parsePublishedDate(published);

	if (date === undefined) {
		throw new Error('Missing published date');
	}

	return date;
}

function formatYamlSingleQuotedString(value: string): string {
	return `'${value.replaceAll("'", "''")}'`;
}

export function formatMarkdown(
	frontmatter: Record<string, FrontmatterValue>,
	body: string
): string {
	const lines = ['---'];

	for (const [key, value] of Object.entries(frontmatter)) {
		if (value === undefined) {
			continue;
		}

		if (Array.isArray(value)) {
			lines.push(`${key}:`);
			for (const item of value) {
				lines.push(`  - ${item}`);
			}
			continue;
		}

		if (key === 'description') {
			const trimmed = value.trim();
			if (trimmed.length === 0) {
				continue;
			}

			lines.push(`description: ${formatYamlSingleQuotedString(trimmed)}`);
			continue;
		}

		if (key === 'title') {
			lines.push(`title: ${JSON.stringify(value)}`);
			continue;
		}

		lines.push(`${key}: ${value}`);
	}

	lines.push('---', '', body.trim(), '');

	return lines.join('\n');
}

export function hasTag(frontmatter: { tags?: unknown }, tag: string): boolean {
	return Array.isArray(frontmatter.tags) && frontmatter.tags.includes(tag);
}

export function readNoteFile<T extends Record<string, unknown>>(
	filePath: string,
	getSlug: (frontmatter: T, baseName: string) => string
) {
	const rawMarkdown = fs.readFileSync(filePath, 'utf8').trimStart();
	const { data, content } = matter(rawMarkdown);
	const frontmatter = data as T;
	const baseName = path.basename(filePath, '.md');
	const slug = getSlug(frontmatter, baseName);

	return { frontmatter, content, baseName, slug, filePath };
}
