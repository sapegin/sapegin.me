// Get themes from the Squirrelsong repo

import fs from 'fs-extra';
import { execSync } from 'child_process';

const REPO_TAR_GZ =
	'https://codeload.github.com/sapegin/squirrelsong/tar.gz/master';

console.log('[SQRLSNG] Downloading themes...');

execSync(`curl "${REPO_TAR_GZ}" | tar xz`);

console.log('[SQRLSNG] Cleaning up...');

// Remove samples not to confuse Astro checker
fs.removeSync('squirrelsong-master/sample');

console.log('[SQRLSNG] Done 🦜');
