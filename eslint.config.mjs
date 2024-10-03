import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import eslintPluginAstro from 'eslint-plugin-astro';
import markdown from '@eslint/markdown';
import jsxAccessibility from 'eslint-plugin-jsx-a11y';

export default [
	...tamiaTypeScriptReact,
	...eslintPluginAstro.configs.recommended,
	...markdown.configs.processor,
	jsxAccessibility.flatConfigs.strict,
	{
		files: ['**/*.astro'],
		rules: {
			// Stop linter from replacing `class` with `className`
			'react/no-unknown-property': 'off',
		},
	},
	{
		files: ['src/env.d.ts'],
		rules: {
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},
	{
		files: ['**/*.md/*.{js,jsx,ts,tsx}'],
		rules: {
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
			'unicorn/prefer-module': 'off',
			'unicorn/prefer-regexp-test': 'off',
			'unicorn/prefer-top-level-await': 'off',

			// Some examples use it
			// Most examples define variables or functions
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
	{
		ignores: [
			'.astro/',
			'assets/squirrelsong/examples/',
			'dist/',
			'public/counter/',
			'squirrelsong-master/',
			'styled-system/',
			'washingcode-book-master/',
		],
	},
];
