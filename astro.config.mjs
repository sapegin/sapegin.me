import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkTips from './src/util/remark/remarkTips';
import remarkImages from './src/util/remark/remarkImages';
import remarkRichtypo from './src/util/remark/remarkRichtypo';
import theme from './src/styles/shiki-themes/blog.color-theme.json';
import { SITE_URL } from './src/constants';

const prettyCodeOptions = {
	theme,
};

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [react(), sitemap()],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	markdown: {
		extendDefaultPlugins: true,
		syntaxHighlight: false,
		remarkPlugins: [remarkTips, remarkImages, remarkRichtypo],
		rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
	},
});
