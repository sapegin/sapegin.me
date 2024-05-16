import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkTips from './src/util/remark/remarkTips';
import remarkImages from './src/util/remark/remarkImages';
import remarkRichtypo from './src/util/remark/remarkRichtypo';
import theme from './src/styles/shiki-themes/blog.color-theme.json';
import { SITE_URL } from './src/constants';

const prettyCodeOptions = {
	theme,
	// Removes `style` attribute from <pre>
	keepBackground: false,
};

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [react(), sitemap()],
	markdown: {
		extendDefaultPlugins: true,
		syntaxHighlight: false,
		remarkPlugins: [remarkTips, remarkImages, remarkRichtypo],
		rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
	},
});
