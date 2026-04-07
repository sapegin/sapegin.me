import path from 'node:path';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import type { RehypePlugins, RemarkPlugins } from 'astro';
import { defineConfig as astroDefineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from './rehype/rehypeSlug.js';
import remarkImages from './remark/remarkImages.js';
import remarkRichtypo from './remark/remarkRichtypo.js';
import remarkTips from './remark/remarkTips.js';

export { astroDefineConfig as defineConfig };

export function getBaseConfig({
	siteHost,
	rehypePlugins,
}: {
	siteHost: string;
	rehypePlugins: RehypePlugins;
}) {
	const publicDir = path.join('sites', siteHost, 'public');
	const siteUrl = `https://${siteHost}`;

	return {
		site: siteUrl,
		// Disable HTML minification to make View Source more readable
		compressHTML: false,
		integrations: [react(), sitemap()],
		markdown: {
			syntaxHighlight: false as const,
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
			] satisfies RehypePlugins,
			remarkPlugins: [
				remarkTips,
				[remarkImages, { publicDir }],
				remarkRichtypo,
			] satisfies RemarkPlugins,
		},
		vite: {
			plugins: [tailwindcss()],
		},
		experimental: {
			contentIntellisense: true,
		},
	};
}
