import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import remarkTips from './src/util/remark/remarkTips';
import theme from './src/styles/shiki-theme.json';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	markdown: {
		remarkPlugins: [remarkTips],
		shikiConfig: {
			theme,
		},
	},
});
