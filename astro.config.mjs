import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
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

const rehypeAutolinkHeadingsOptions = {
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
};

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [react(), sitemap()],
	markdown: {
		extendDefaultPlugins: true,
		syntaxHighlight: false,
		rehypePlugins: [
			[rehypePrettyCode, prettyCodeOptions],
			rehypeSlug,
			[rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
		],
		remarkPlugins: [remarkTips, remarkImages, remarkRichtypo],
	},
});
