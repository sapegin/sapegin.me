#!/usr/bin/env node

/**
 * Sync recipes from Obsidian vault to JSON files for Astro.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';
import { toKebabCase } from '../shared/util/toKebabCase';
import type { RecipeRaw } from '../sites/tacohuaco/src/types/Recipe';

const VAULT_DIR = path.join(os.homedir(), 'murder', '🌮 Food');
const ATTACHMENTS_DIR = path.join(os.homedir(), 'murder', 'attachments');
const IMAGES_OUTPUT_DIR = 'sites/tacohuaco/public/images/recipes';
const OUTPUT_DIR = 'content/recipes';

const THUMBNAIL_WIDTH = 960;
const THUMBNAIL_QUALITY = 60;

interface NoteFrontmatter {
	aliases?: string[];
	date?: string;
	keywords?: string[];
	refs?: string[];
	slug?: string;
	source?: string;
	status?: string;
	tags?: string[];
	time?: string;
	titleEnglish?: string;
	yields?: string;
}

/**
 * Returns true if srcPath is newer than destPath, or destPath doesn't exist.
 */
function isNewer(srcPath: string, destPath: string): boolean {
	if (fs.existsSync(destPath) === false) {
		return true;
	}
	const srcMtime = fs.statSync(srcPath).mtimeMs;
	const destMtime = fs.statSync(destPath).mtimeMs;
	return srcMtime > destMtime;
}

function toSlug(name: string) {
	// `normalize('NFKD')` splits accented letters into their base letter plus a
	// combining accent mark, so removing the combining marks turns "Café" into
	// "Cafe" before we slugify it
	const asciiName = name.normalize('NFKD').replaceAll(/[\u0300-\u036f]/g, '');

	// Convert the normalized name to kebab-case
	return toKebabCase(asciiName);
}

function getSlug(frontmatter: NoteFrontmatter, baseName: string) {
	return frontmatter.slug ?? toSlug(baseName);
}

function readRecipeFile(filePath: string) {
	const markdown = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(markdown);
	const frontmatter = data as NoteFrontmatter;
	const { name } = path.parse(filePath);
	const slug = getSlug(frontmatter, name);
	return { frontmatter, content, baseName: name, slug };
}

/**
 * Normalize list markers: replace `*` with `-`, as richtypo seems to have some
 * issues with the former.
 */
function normalizeListMarkers(text: string): string {
	return text.replaceAll(/^(\s*)\* /gm, '$1- ');
}

function parseSections(content: string): Map<string, string> {
	const sections = new Map<string, string>();
	const parts = content.split(/^## /m);

	for (let i = 1; i < parts.length; i++) {
		const newlineIndex = parts[i].indexOf('\n');
		if (newlineIndex !== -1) {
			// The first line is a heading
			const heading = parts[i].slice(0, newlineIndex).trim();
			// The remaining is a body (but chop off anything after ---)
			const body = parts[i]
				.slice(newlineIndex + 1)
				.split('---')[0]
				.trim();
			sections.set(heading, body);
		}
	}

	return sections;
}

function extractTitle(content: string): string {
	const match = content.match(/^# (.+)$/m);
	return match ? match[1].trim() : '';
}

// Matches wikilinks: [[target]] or [[target|label]]
const WIKILINK_REGEXP = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;

function extractImage(content: string): { filename: string } | undefined {
	const match = content.match(new RegExp(`!${WIKILINK_REGEXP.source}`));
	return match ? { filename: match[1] } : undefined;
}

function resolveWikilinks(text: string, slugMap: Map<string, string>): string {
	return text.replaceAll(
		new RegExp(WIKILINK_REGEXP.source, 'g'),
		(_match, target: string, label?: string) => {
			const slug = slugMap.get(target);
			if (slug) {
				return `[${label ?? target}](/recipes/${slug}/)`;
			}
			return label ?? target;
		}
	);
}

function getAllWikilinks(markdown: string): string[] {
	const matches = markdown.matchAll(new RegExp(WIKILINK_REGEXP.source, 'g'));

	const titles = [];
	for (const match of matches) {
		titles.push(match[1]);
	}

	return titles;
}

async function copyImages(markdown: string, slug: string) {
	const imageMatch = extractImage(markdown);
	if (imageMatch) {
		const srcPath = path.join(ATTACHMENTS_DIR, imageMatch.filename);
		if (fs.existsSync(srcPath)) {
			const destPath = path.join(IMAGES_OUTPUT_DIR, `${slug}.avif`);
			const destThumbPath = path.join(IMAGES_OUTPUT_DIR, `${slug}_thumb.avif`);

			if (isNewer(srcPath, destPath)) {
				// Copy the original large image (it already has the right size and format
				// thanks to obsidian-update script)
				fs.copyFileSync(srcPath, destPath);

				// Create a thumbnail
				const originalImage = Buffer.from(fs.readFileSync(srcPath));
				const pipeline = sharp(originalImage).resize({
					width: THUMBNAIL_WIDTH,
				});
				await pipeline
					.avif({ quality: THUMBNAIL_QUALITY })
					.toFile(destThumbPath);
			}

			return {
				imageUrl: `/images/recipes/${slug}.avif`,
				thumbnailUrl: `/images/recipes/${slug}_thumb.avif`,
			};
		} else {
			console.warn(`⚠️  Image not found: ${srcPath}`);
		}
	}
	return { imageUrl: undefined, thumbnailUrl: undefined };
}

console.log('🌮 Syncing recipes from Obsidian vault…\n');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(IMAGES_OUTPUT_DIR, { recursive: true });

// Read all Markdown files from the Food folder in the vault
const files = fs.readdirSync(VAULT_DIR).filter((f) => f.endsWith('.md'));
console.log(`Found ${files.length} notes about food\n`);

// First pass: build slug map for all public recipes

// Slug map: title -> slug
const slugMap = new Map<string, string>();

const publishedRecipes: string[] = [];

for (const filename of files) {
	const filePath = path.join(VAULT_DIR, filename);
	const { frontmatter, baseName, slug } = readRecipeFile(filePath);

	if (frontmatter.status !== 'published') {
		continue;
	}

	slugMap.set(baseName, slug);
	publishedRecipes.push(filePath);
}

console.log(`Found ${publishedRecipes.length} published recipes\n`);

// Second pass: build usage map

// Usage map: slug -> slug[]
const usageMap = new Map<string, string[]>();

for (const filePath of publishedRecipes) {
	const { content, slug } = readRecipeFile(filePath);

	const sections = parseSections(normalizeListMarkers(content));
	const ingredientsMarkdown = sections.get('Ingredients');
	if (ingredientsMarkdown === undefined) {
		continue;
	}

	const allLinkTitles = getAllWikilinks(ingredientsMarkdown);
	for (const title of allLinkTitles) {
		const refSlug = slugMap.get(title);
		if (refSlug) {
			const slugs = usageMap.get(refSlug) ?? [];
			slugs.push(slug);
			usageMap.set(refSlug, slugs);
		}
	}
}

let count = 0;

for (const filePath of publishedRecipes) {
	const { frontmatter, content, baseName, slug } = readRecipeFile(filePath);

	const title = extractTitle(content);

	if (title === '') {
		console.warn(`⚠️  o H1 title found in ${baseName}, skipping`);
		continue;
	}

	const outputPath = path.join(OUTPUT_DIR, `${slug}.json`);
	if (isNewer(filePath, outputPath) === false) {
		continue;
	}

	console.log('👉', title);

	const sections = parseSections(normalizeListMarkers(content));

	// Date: frontmatter or file birthtime
	let dateString: string;
	if (frontmatter.date) {
		dateString = frontmatter.date;
	} else {
		const stat = fs.statSync(filePath);
		dateString = stat.birthtime.toISOString();
	}

	// Sections
	const ingredientsMarkdown = sections.get('Ingredients') ?? '';
	const stepsMarkdown = sections.get('Steps') ?? '';
	const descriptionMarkdown = sections.get('Description') ?? undefined;
	const notesMarkdown = sections.get('Notes') ?? undefined;
	const toolsMarkdown = sections.get('Tools') ?? undefined;
	const sourceMarkdown = sections.get('Source') ?? undefined;

	// Resolve wikilinks in ingredients and steps
	const ingredients = resolveWikilinks(ingredientsMarkdown, slugMap);
	const steps = resolveWikilinks(stepsMarkdown, slugMap);
	const description = descriptionMarkdown
		? resolveWikilinks(descriptionMarkdown, slugMap)
		: undefined;

	// Image handling
	const { imageUrl, thumbnailUrl } = await copyImages(content, slug);

	// Remove 'recipes' tag -- they are all recipes here
	const tags = (frontmatter.tags ?? []).filter((tag) => tag !== 'recipes');

	// Merge aliases and keywords
	const keywords = [
		...(frontmatter.aliases ?? []),
		...(frontmatter.keywords ?? []),
	].filter(Boolean);

	// Check if the recipe has overnight steps
	const overnight = steps.includes('overnight');

	const recipe: RecipeRaw = {
		slug,
		createdAt: dateString,
		title,
		titleEnglish: frontmatter.titleEnglish ?? undefined,
		tags,
		description,
		imageUrl,
		thumbnailUrl,
		ingredients,
		steps,
		keywords,
		notes: notesMarkdown,
		overnight,
		time: frontmatter.time ?? undefined,
		tools: toolsMarkdown ?? undefined,
		yields: frontmatter.yields ?? undefined,
		source: sourceMarkdown,
		usedBy: usageMap.get(slug) ?? [],
	};

	const filepath = path.join(OUTPUT_DIR, `${slug}.json`);
	fs.writeFileSync(filepath, JSON.stringify(recipe, null, 2));
	console.log(`  ↪ ${filepath}`);

	count++;
}

// Delete recipes removed from the Vault
const publishedSlugs = new Set(slugMap.values());
const existingJsonFiles = fs
	.readdirSync(OUTPUT_DIR)
	.filter((f) => f.endsWith('.json'));

let deleted = 0;
for (const jsonFile of existingJsonFiles) {
	const slug = path.parse(jsonFile).name;
	if (publishedSlugs.has(slug) === false) {
		const jsonPath = path.join(OUTPUT_DIR, jsonFile);
		const imagePath = path.join(IMAGES_OUTPUT_DIR, `${slug}.avif`);
		const thumbPath = path.join(IMAGES_OUTPUT_DIR, `${slug}_thumb.avif`);

		fs.unlinkSync(jsonPath);
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath);
		}
		if (fs.existsSync(thumbPath)) {
			fs.unlinkSync(thumbPath);
		}

		console.log(`🗑️  Deleted ${slug}`);
		deleted++;
	}
}

console.log();
console.log(`${count} recipes synced, ${deleted} deleted`);
