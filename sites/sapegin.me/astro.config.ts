import type { RehypePlugins } from 'astro';
import rehypePrettyCode from 'rehype-pretty-code';
import { defineConfig, getBaseConfig } from '../../shared/astro.config.base.js';
import { SITE_HOST } from './src/constants.ts';
import theme from './src/styles/shiki-themes/blog.color-theme.json';

const rehypePlugins: RehypePlugins = [
	[
		rehypePrettyCode,
		{
			theme,
			// Removes `style` attribute from <pre>
			keepBackground: false,
			// Make code block not focusable as they wrap instead of scrolling
			transformers: [
				{
					pre(node: { properties: { tabindex: undefined } }) {
						node.properties.tabindex = undefined;
					},
				},
			],
		},
	],
];

export default defineConfig({
	...getBaseConfig({
		siteHost: SITE_HOST,
		rehypePlugins,
	}),
});
