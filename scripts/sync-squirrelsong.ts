// Get themes from the Squirrelsong repo
// Create pages with instructions for each theme

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import { globSync } from 'glob';

const REPO_TAR_GZ =
	'https://codeload.github.com/sapegin/squirrelsong/tar.gz/master';
const REPO_DIR = 'squirrelsong-master';
const DEST_DIR = 'src/content/squirrels';
const URL_PREFIX = 'https://github.com/sapegin/squirrelsong/raw/master';

const read = (file: string) => fs.readFileSync(file, 'utf8');

const getId = (filepath: string) =>
	path.basename(path.dirname(filepath)).toLowerCase().replace(/ /g, '-');

const stripMarkdown = (contents: string) =>
	contents.replace(/\[([^\]]*?)\]\([^)]+\)/g, '$1');

const stripTitle = (contents: string) => contents.replace(/^#+ .*$/m, '');

const getTitle = (contents: string) =>
	stripMarkdown(contents.match(/^#+ (.*?)$/m)?.[1] ?? '');

const getAliases = (contents: string) =>
	stripMarkdown(
		contents.match(/^Also works in[^:]*:\s*([^\n]+)/m)?.[1] ?? ''
	).replace(/\.$/, '');

// TODO: We'll probably need to use something more bullet proof so we can
// generate links for each alias "and other Chromium-based browsers" won't work
// for that
const getAppName = (contents: string) =>
	getTitle(contents).match(/for \[?([^\]]+)/)?.[1] ?? '';

// TODO: Not sure it'll work with external images
// const getCoverImage = (contents: string) =>
// 	contents.match(/!\[[^\]]*?\]\(([^)]+)\)/)?.[1] ?? '';

const hasLightTheme = (contents: string) =>
	contents.includes('screenshot-light');

const hasDarkTheme = (contents: string) => contents.includes('screenshot-dark');

const updateTips = (contents: string) =>
	contents.replace(/\n>\s*\[!(WARNING|NOTE)\]\s*\n>\s*/gm, ($, marker) => {
		return `\n**${_.upperFirst(marker.toLowerCase())}:** `;
	});

const updateImages = (prefix: string) => (contents: string) =>
	contents.replace(
		/\]\(screenshot-/g,
		`](../../../${prefix.replace(/ /g, '%20')}/screenshot-`
	);

// Update links and images
// foo.png → https://github.com/sapegin/squirrelsong/raw/master/themes/Bear/foo.png
const updateLinks = (prefix: string) => (contents: string) =>
	contents.replace(/\[([^\]]*?)\]\(([^)]+)\)/g, ($, title, href) => {
		if (
			href.startsWith('http') ||
			href.startsWith('chrome:') ||
			href.startsWith('../')
		) {
			return `[${title}](${href})`;
		}

		return `[${title}](${URL_PREFIX}/${prefix.replace(`${REPO_DIR}/`, '').replace(/ /g, '%20')}/${href})`;
	});

console.log('[SQRLSNG] Downloading themes...');

// execSync(`rm -rf ${REPO_DIR}; curl "${REPO_TAR_GZ}" | tar xz`);
execSync(`curl "${REPO_TAR_GZ}" | tar xz`);

console.log('[SQRLSNG] Cleaning up...');

// Remove samples not to confuse Astro checker
fs.removeSync(`${REPO_DIR}/sample`);

console.log('[SQRLSNG] Generating site pages...');

const readmes = globSync(`${REPO_DIR}/themes/*/Readme.md`);

fs.ensureDirSync(DEST_DIR);

for (const filepath of readmes) {
	console.log(`[SQRLSNG] 👉 ${filepath}`);
	const readme = read(filepath);

	const hasLight = hasLightTheme(readme);
	const hasDark = hasDarkTheme(readme);

	// Skip incomplete themes
	if (hasLight === false && hasDark === false) {
		continue;
	}

	const folder = path.dirname(filepath);
	const id = getId(filepath);
	const app = getAppName(readme);
	const title = getTitle(readme);

	const markdown = _.flow(
		stripTitle,
		updateTips,
		updateImages(folder),
		updateLinks(folder)
	)(readme).trim();

	const contents = `---
title: '${title}'
app: ${app}
aliases: ${getAliases(readme)}
light: ${hasLight}
dark: ${hasDark}
---

${markdown}
`;
	fs.writeFileSync(`${DEST_DIR}/${id}.md`, contents);
}

console.log('[SQRLSNG] Done 🦜');
