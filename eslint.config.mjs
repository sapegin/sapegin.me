import markdown from '@eslint/markdown';
import reactPlugin from '@eslint-react/eslint-plugin';
import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import jsxAccessibility from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default [
	...tamiaTypeScriptReact,
	...eslintPluginAstro.configs.recommended,
	...markdown.configs.processor,
	jsxAccessibility.flatConfigs.strict,
	{
		...eslintPluginBetterTailwindcss.configs.recommended,
		files: ['sites/sapegin.me/**/*.{ts,tsx,astro}'],
		settings: {
			'better-tailwindcss': {
				entryPoint: 'sites/sapegin.me/src/styles/index.css',
			},
		},
	},
	{
		...eslintPluginBetterTailwindcss.configs.recommended,
		files: ['sites/morning.photos/**/*.{ts,tsx,astro}'],
		settings: {
			'better-tailwindcss': {
				entryPoint: 'sites/morning.photos/src/styles/index.css',
			},
		},
	},
	{
		...eslintPluginBetterTailwindcss.configs.recommended,
		files: ['sites/tacohuaco/**/*.{ts,tsx,astro}'],
		settings: {
			'better-tailwindcss': {
				entryPoint: 'sites/tacohuaco/src/styles/index.css',
			},
		},
	},
	{
		...eslintPluginBetterTailwindcss.configs.recommended,
		files: ['shared/**/*.{ts,tsx}'],
		settings: {
			'better-tailwindcss': {
				entryPoint: 'shared/styles/index.css',
			},
		},
	},
	{
		files: ['**/*.md/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parserOptions: {
				// Disable types because they don't work in Markdown files
				projectService: false,
			},
		},
		rules: {
			// Disable rules that require types
			...tseslint.configs.disableTypeChecked.rules,
			...reactPlugin.configs['disable-type-checked'].rules,

			// Can't disable these for a particular example because
			// of the prettier-ignore comment
			curly: 'off',
			'no-cond-assign': 'off',
			'no-constant-condition': 'off',
			'no-extra-label': 'off',
			'no-labels': 'off',
			'no-lone-blocks': 'off',
			'no-unreachable': 'off',
			'no-unused-labels': 'off',
			'unicorn/no-abusive-eslint-disable': 'off',
			'unicorn/no-array-sort': 'off',
			'unicorn/no-negation-in-equality-check': 'off',
			'unicorn/no-nested-ternary': 'off',
			'unicorn/prefer-node-protocol': 'off',

			// Many "bad" example use this
			camelcase: 'off',
			eqeqeq: 'off',
			'no-alert': 'off',
			'no-empty': 'off',
			'no-var': 'off',
			'one-var': 'off',
			'prefer-const': 'off',
			'unicorn/expiring-todo-comments': 'off',
			'unicorn/no-null': 'off',
			'unicorn/prefer-global-this': 'off',
			'unicorn/prefer-module': 'off',
			'unicorn/prefer-regexp-test': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'washing-code/explicit-boolean-check': 'off',

			// Most examples define variables or functions
			'@typescript-eslint/no-unused-vars': 'off',

			// Disable Tailwind linting
			'better-tailwindcss/no-unknown-classes': 'off',
		},
	},
	{
		ignores: [
			'sites/*/.astro/',
			'sites/*/public/counter/',
			'sites/*/dist/',
			'assets/squirrelsong/examples/',
			'squirrelsong-master/',
			'washingcode-book-master/',
			'content/bookChapters/',
		],
	},
];
