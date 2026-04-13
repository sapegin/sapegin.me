#!/usr/bin/env node

/**
 * Convert JSON recipe files in a folder to Markdown files.
 */

import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';

const inputDir = 'content/recipes';
const outputDir = 'content/recipes-md';
const attachmentsDir = path.join(outputDir, 'attachments');

fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(attachmentsDir, { recursive: true });

const TAG_MAP = {
	breakfast: 'breakfasts',
	dip: 'dips',
	stew: 'stews',
	dinner: 'dinners',
	dessert: 'desserts',
	soup: 'soups',
	salad: 'salads',
	snack: 'snacks',
	drink: 'drinks',
	airfryer: 'one-pot',
	onepot: 'air-fryer',
	dutchoven: 'dutch-oven',
	sweetbread: 'sweet-bread',
	picnic: 'picnics',
	foundation: 'foundation-recipes',
	quick: 'quick-recipes',
	lunch: 'lunches',
	brunch: 'brunches',
	creamsoup: 'cream-soups',
	salsa: 'salsas',
	sauce: 'sauces',
	celebration: 'holidays',
	icing: 'icings',
	cake: 'cakes',
	fastfood: 'fast-food',
	sandwich: 'sandwiches',
	'unitedstates-cuisine': 'american-cuisine',
	'middleeastern-cuisine': 'middle-eastern-cuisine',
};
/* ---------------- helpers ---------------- */

function formatDate(iso) {
	return iso ? iso.split('T')[0] : '';
}

function formatGroupName(name) {
	return name.trim().replaceAll('To make the ', 'To cook the ');
}

function formatYield(y) {
	// eslint-disable-next-line washing-code/explicit-boolean-check
	if (!y) {
		return '';
	}
	const unit = y.unit || '';
	const plural = y.amount > 1 ? 's' : '';
	return `${y.amount} ${unit}${plural}`;
}

function formatTime(minutes) {
	return minutes ? `${minutes} minutes` : '';
}

function formatTags(tags = [], cuisines = []) {
	const cuisineTags = (cuisines || [])
		.filter((c) => c !== 'Klatzlandian')
		.map((c) => `${c.toLowerCase()}-cuisine`);

	const allTags = [...tags, ...cuisineTags];

	return [
		'recipes',
		...allTags.map((tag) => {
			const key = tag.toLowerCase();
			return TAG_MAP[key] || key;
		}),
	];
}

/* ---------------- ingredient map ---------------- */

function buildIngredientMap(json) {
	const map = new Map();

	// Flatten all ingredients from groups
	for (const group of json.ingredients) {
		for (const line of group.ingredients) {
			for (const item of line) {
				map.set(item.name.toLowerCase(), item);
			}
		}
	}

	// Include subrecipes as ingredients (if any)
	if (json.subrecipes) {
		for (const sr of json.subrecipes) {
			map.set(sr.title.toLowerCase(), { name: sr.title });
		}
	}
	return map;
}

/* ---------------- renderers ---------------- */

function renderIngredients(groups = []) {
	let out = '## Ingredients\n';

	for (const group of groups) {
		if (group.name && group.name.trim()) {
			out += `### ${formatGroupName(group.name)}\n`;
		}

		for (const line of group.ingredients) {
			const parts = line.map((item) => {
				const modifier = item.modifier || '';
				let amountStr = '';
				if (item.minAmount != null) {
					amountStr =
						item.maxAmount == null
							? `${item.minAmount}`
							: item.minAmount === item.maxAmount
								? `${item.minAmount}`
								: `${item.minAmount}-${item.maxAmount}`;
				}
				const unit = item.unit || '';
				const comment = item.comment ? `; ${item.comment}` : '';

				return (
					[amountStr, unit, modifier, item.name].filter(Boolean).join(' ') +
					comment
				);
			});
			out += `- ${parts.join(', ')}\n`;
		}

		out += '\n';
	}

	return out;
}

function expandStepText(text, ingredientMap) {
	// eslint-disable-next-line washing-code/explicit-boolean-check
	if (!text) {
		return text;
	}

	const formatIngredient = (item, stepModifier) => {
		// eslint-disable-next-line washing-code/explicit-boolean-check
		if (!item) {
			return '';
		}

		// Use modifier from step tag if present, otherwise ingredient
		const modifier = stepModifier || item.modifier || '';

		// Amount formatting
		let amountStr = '';
		if (item.minAmount != null) {
			amountStr =
				item.maxAmount == null
					? `${item.minAmount}`
					: item.minAmount === item.maxAmount
						? `${item.minAmount}`
						: `${item.minAmount}-${item.maxAmount}`;
		}

		const unit = item.unit || '';
		const comment = item.comment ? `; ${item.comment}` : '';

		return (
			[amountStr, unit, modifier, item.name].filter(Boolean).join(' ').trim() +
			comment
		);
	};

	// Replace <Ingredient> tags
	const expanded = text.replaceAll(
		/<Ingredient\s+name="([^"]+)"(?:\s+modifier="([^"]+)")?\s*\/>/gi,
		(_, name, stepModifier) => {
			const key = name.toLowerCase();
			const item = ingredientMap.get(key);
			return formatIngredient(item, stepModifier);
		}
	);

	// Handle <br> as nested lists
	const lines = expanded
		.split(/<br\s*\/?>/i)
		.map((l) => l.trim())
		.filter(Boolean);

	if (lines.length > 1) {
		const main = lines[0];
		const subItems = lines
			.slice(1)
			.map((l) => `    - ${l}`)
			.join('\n');
		return [main, subItems].join('\n');
	}

	return lines[0];
}

function renderSteps(groups = [], ingredientMap) {
	let out = '## Steps\n';

	for (const group of groups) {
		if (group.name && group.name.trim()) {
			out += `### ${formatGroupName(group.name)}\n`;
		}

		for (const [i, step] of group.steps.entries()) {
			const text = expandStepText(step.text, ingredientMap);
			// For multi-line steps, add line breaks before numbering to preserve
			// Markdown
			out += `${i + 1}. ${text}\n`;
		}

		out += '\n';
	}

	return out;
}

function renderImage(images = [], slug) {
	if (images.length === 0) {
		return '';
	}
	return `\n---\n\n![[${slug}.jpg]]\n`;
}

function downloadFile(url, dest) {
	return new Promise((resolve, reject) => {
		https
			.get(url, (res) => {
				if (
					res.statusCode >= 300 &&
					res.statusCode < 400 &&
					res.headers.location
				) {
					return downloadFile(res.headers.location, dest).then(resolve, reject);
				}
				if (res.statusCode !== 200) {
					return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
				}
				const stream = fs.createWriteStream(dest);
				res.pipe(stream);
				stream.on('finish', () => stream.close(resolve));
				stream.on('error', reject);
			})
			.on('error', reject);
	});
}

/* ---------------- main builder ---------------- */

function buildMarkdown(json) {
	const ingredientMap = buildIngredientMap(json);

	// Keywords field directly from recipe
	const keywords = json.keywords || [];

	const frontmatter = `---
tags:
${formatTags(json.tags, json.cuisines)
	.map((t) => `  - ${t}`)
	.join('\n')}
${
	keywords.length > 0
		? `keywords:
${keywords.map((k) => `  - ${k}`).join('\n')}\n`
		: ''
}status: published
yields: ${formatYield(json.yields)}
time: ${formatTime(json.time)}
date: ${formatDate(json.createdAt)}
---
`;

	const title = `# ${json.title}\n`;

	const ingredients = renderIngredients(json.ingredients);
	const steps = renderSteps(json.steps, ingredientMap);

	const description = json.description
		? `## Description\n${json.description}\n`
		: '';

	const image = renderImage(json.images, json.slug);

	return [frontmatter, title, ingredients, '', steps, description, image].join(
		'\n'
	);
}

/* ---------------- IO ---------------- */

async function processFile(file) {
	const inputPath = path.join(inputDir, file);

	const raw = fs.readFileSync(inputPath, 'utf8');
	const json = JSON.parse(raw);

	const outputPath = path.join(outputDir, `${json.title}.md`);

	const md = buildMarkdown(json);

	fs.writeFileSync(outputPath, md, 'utf8');
	console.log(`✔ ${file} → ${path.basename(outputPath)}`);

	if (json.images && json.images.length > 0) {
		const imagePath = path.join(attachmentsDir, `${json.slug}.jpg`);
		try {
			await downloadFile(json.images[0].url, imagePath);
			console.log(`  📷 ${json.slug}.jpg`);
		} catch (err) {
			console.error(
				`  ⚠ Failed to download image for ${json.slug}: ${err.message}`
			);
		}
	}
}

async function main() {
	const files = fs.readdirSync(inputDir).filter((f) => f.endsWith('.json'));

	for (const file of files) {
		await processFile(file);
	}
}

await main();
