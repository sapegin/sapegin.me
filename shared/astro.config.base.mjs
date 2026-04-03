import fs from 'node:fs';
import path from 'node:path';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig as astroDefineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from './rehype/rehypeSlug.js';
import remarkImages from './remark/remarkImages.js';
import remarkRichtypo from './remark/remarkRichtypo.js';
import remarkTips from './remark/remarkTips.js';

export { astroDefineConfig as defineConfig };

const getFileMtime = (filename) => {
	try {
		return fs.statSync(filename).mtime;
	} catch {
		// Ignore errors
	}
};

export function getBaseConfig({ siteHost, getFileByUrl, rehypePlugins }) {
	const publicDir = path.join('sites', siteHost, 'public');
	const siteUrl = `https://${siteHost}`;

	return {
		site: siteUrl,
		// Disable HTML minification to make View Source more readable
		compressHTML: false,
		integrations: [
			react(),
			sitemap({
				serialize: (item) => {
					const filename = getFileByUrl?.(item.url);
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
			syntaxHighlight: false,
			rehypePlugins: [
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
				...rehypePlugins,
			],
			remarkPlugins: [
				remarkTips,
				[remarkImages, { publicDir }],
				remarkRichtypo,
			],
		},
		vite: {
			plugins: [tailwindcss()],
		},
		experimental: {
			contentIntellisense: true,
		},
	};
}
