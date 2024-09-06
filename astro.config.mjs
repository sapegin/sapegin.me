import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkTips from './src/util/remark/remarkTips';
import remarkImages from './src/util/remark/remarkImages';
import remarkRichtypo from './src/util/remark/remarkRichtypo';
import rehypeSlug from './src/util/rehype/rehypeSlug';
import theme from './src/styles/shiki-themes/blog.color-theme.json';
import { SITE_URL } from './src/constants';

const getFileByUrl = (url) => {
	const relativeUrl = url.replace(SITE_URL, '');
	if (relativeUrl.startsWith('/blog/')) {
		return `src/content${relativeUrl.replace(/\/$/, '.md')}`;
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
	site: SITE_URL,
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
						ariaHidden: true,
						class: 'heading__anchor',
						tabIndex: '-1',
					},
				},
			],
		],
		remarkPlugins: [remarkTips, remarkImages, remarkRichtypo],
	},
});
