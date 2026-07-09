import path from 'node:path';
import {
	type RehypePlugins,
	type RemarkPlugins,
	unified,
} from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from './rehype/rehypeSlug.js';
import remarkCallouts from './remark/remarkCallouts.js';
import remarkImages from './remark/remarkImages.js';
import remarkRichtypo from './remark/remarkRichtypo.js';

export { defineConfig } from 'astro/config';

export function getBaseConfig({
	siteHost,
	rehypePlugins,
}: {
	siteHost: string;
	rehypePlugins: RehypePlugins;
}) {
	const publicDir = path.join('sites', siteHost, 'public');
	const siteUrl = `https://${siteHost}`;
	const rootDir = path.resolve(import.meta.dirname, '..');

	return {
		site: siteUrl,
		// Disable HTML minification to make View Source more readable
		compressHTML: false,
		integrations: [react(), sitemap()],
		markdown: {
			syntaxHighlight: false as const,
			processor: unified({
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
					remarkCallouts,
					[remarkImages, { publicDir }],
					remarkRichtypo,
				] satisfies RemarkPlugins,
			}),
		},
		vite: {
			plugins: [tailwindcss()],
			resolve: {
				alias: {
					'@shared': path.join(rootDir, 'shared'),
					'@tamia': path.join(rootDir, 'shared', 'packages', 'tamia'),
				},
			},
		},
		experimental: {
			contentIntellisense: true,
		},
	};
}
