import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import jsxAccessibility from 'eslint-plugin-jsx-a11y';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	...tamiaTypeScriptReact,
	...eslintPluginAstro.configs.recommended,
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
		ignores: [
			'.astro/',
			'assets/squirrelsong/examples/',
			'dist/',
			'public/counter/',
			'squirrelsong-master/',
			'src/content/til/',
			'styled-system/',
			'til-master/',
			'washingcode-book-master/',
		],
	},
];
