import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import remarkTips from './plugins/remark-tips';
import theme from './src/styles/shiki-theme.json';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	remarkPlugins: [remarkTips],
	markdown: {
		shikiConfig: {
			theme,
		},
	},
});
