// Get Markdown from the TIL repo

// TODO: Convert to TypeScript

import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import { globSync } from 'glob';

const REPO_TAR_GZ = 'https://codeload.github.com/sapegin/til/tar.gz/master';
const REPO_DIR = 'til-master';
const DEST_DIR = 'src/content/til';

const read = (file) => fs.readFileSync(file, 'utf8');

const write = (file, contents) => {
	const filepath = `${DEST_DIR}/${file}`;
	fs.mkdirpSync(path.dirname(filepath));
	return fs.writeFileSync(filepath, contents);
};

const getTitle = (contents) => contents.match(/^#\s*(.*?)$/m) || [];

const getMeta = (contents) =>
	contents.match(/^<!--\s*(\d\d\d\d-\d\d-\d\d)\s*(.*?)?\s*-->/) || [];

const stripTitle = (contents) => contents.replace(/^#.*?$/m, '');

const template = ({ title, date, tags, contents }) => `---
title: '${title}'
description: ''
date: ${date}
tags:
  - ${tags.join('\n  - ')}
---

${stripTitle(contents)}`;

console.log('[TIL] Downloading source files...');

execSync(`curl "${REPO_TAR_GZ}" | tar xz`);

fs.emptyDirSync(DEST_DIR);

console.log();
console.log('[TIL] Syncing files...');

const docs = globSync(`${REPO_DIR}/*/*.md`);
docs.forEach((filepath) => {
	console.log(`[TIL] 👉 ${filepath}`);
	const contents = read(filepath);
	const [, title] = getTitle(contents);
	const [, date, tags] = getMeta(contents);
	write(
		filepath.replace(`${REPO_DIR}/`, ''),
		template({
			title,
			date,
			tags: tags.split(/, ?/),
			contents,
		})
	);
});

console.log('[TIL] Done 🦜');
