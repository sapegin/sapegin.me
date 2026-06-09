import { defineConfig } from 'oxfmt';
import oxfmt from 'oxlint-config-raccoon/oxfmt';

export default defineConfig({
	...oxfmt,
	ignorePatterns: [
		'sites/*/.astro/',
		'sites/*/dist/',
		'sites/*/public/counter/count.min.js',
		'squirrelsong-master/',
		'washingcode-book-master/',
		'content/photos/',
		'content/recipes/',
	],
});
