import fs from 'node:fs';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const SITE = process.env.SITE || 'sapegin.me';
const siteDir = `./src/sites/${SITE}`;

const { SITE_URL } = await import(/* @vite-ignore */ `${siteDir}/constants.ts`);

import rehypeSlug from './src/shared/rehype/rehypeSlug';
import remarkImages from './src/shared/remark/remarkImages';
import remarkRichtypo from './src/shared/remark/remarkRichtypo';
import remarkTips from './src/shared/remark/remarkTips';
import theme from './src/sites/sapegin.me/styles/shiki-themes/blog.color-theme.json';

const getFileByUrl = (url) => {
	const relativeUrl = url.replace(SITE_URL, '');
	if (relativeUrl.startsWith('/blog/')) {
		return `content${relativeUrl.replace(/\/$/, '.md')}`;
	}
};

const getFileMtime = (filename) => {
	try {
		return fs.statSync(filename).mtime;
	} catch {
		// Ignore errors
	}
};

// https://astro.build/config
export default defineConfig({
	srcDir: siteDir,
	site: SITE_URL,
	// Disable HTML minification to make View Source more readable
	compressHTML: false,
	integrations: [
		react(),
		sitemap({
			serialize: (item) => {
				const filename = getFileByUrl(item.url);

				if (filename !== undefined) {
					// Google doesn't see some pages even if they are in the
					// sitemap. Try to add modification date to see if it helps
					const mtime = getFileMtime(filename);
					if (mtime) {
						item.lastmod = mtime;
					}
				}

				return item;
			},
		}),
	],
	markdown: {
		extendDefaultPlugins: true,
		syntaxHighlight: false,
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme,
					// Removes `style` attribute from <pre>
					keepBackground: false,
					// Make code block not focusable as they wrap instead of scrolling
					transformers: [
						{
							pre(node) {
								node.properties.tabindex = undefined;
							},
						},
					],
				},
			],
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					content: {
						type: 'text',
						value: '#',
					},
					headingProperties: { class: 'heading' },
					properties: {
						ariaHidden: 'true',
						class: 'heading__anchor',
						tabIndex: '-1',
					},
				},
			],
		],
		remarkPlugins: [remarkTips, remarkImages, remarkRichtypo],
	},
	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
		contentIntellisense: true,
	},
});
