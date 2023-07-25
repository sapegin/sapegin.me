import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import remarkTips from './src/util/remark/remarkTips';
import remarkImages from './src/util/remark/remarkImages';
import remarkRichtypo from './src/util/remark/remarkRichtypo';
import theme from './src/styles/shiki-theme.json';
import { SITE_URL } from './src/constants';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [react(), sitemap()],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	markdown: {
		remarkPlugins: [remarkTips, remarkImages, remarkRichtypo],
		shikiConfig: {
			theme,
		},
	},
});
