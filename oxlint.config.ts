import { defineConfig } from 'oxlint';
import typescriptReactTailwind from 'oxlint-config-raccoon/typescript-react-tailwind';

// TODO: Not sure it still checks the code inside Markdown files

export default defineConfig({
	extends: [typescriptReactTailwind],
	options: { typeAware: true, typeCheck: true },
	settings: {
		tailwindcss: {
			entryPoint: [
				{
					files: 'sites/sapegin.me/**',
					use: 'sites/sapegin.me/src/styles/index.css',
				},
				{
					files: 'sites/morning.photos/**',
					use: 'sites/morning.photos/src/styles/index.css',
				},
				{
					files: 'sites/tacohuaco/**',
					use: 'sites/tacohuaco/src/styles/index.css',
				},
				{
					files: '**',
					use: 'shared/styles/index.css',
				},
			],
		},
	},
	ignorePatterns: [
		'sites/*/.astro/',
		'sites/*/dist/',
		'content/photos/',
		'content/recipes/',
		'sites/*/public/counter/',
		'sites/*/dist/',
		'assets/squirrelsong/examples/',
		'squirrelsong-master/',
		'washingcode-book-master/',
		'content/bookChapters/',
	],
});
