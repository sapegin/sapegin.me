import { OGImageRoute } from 'astro-og-canvas';
import { SITE_AUTHOR } from '../../constants';
import type { Post } from '../../types/Post';

type RgbColor = [number, number, number];

// HACK: As we cannot use CSS theme directly, we hardcode color value
const COLOR_BACKGROUND: RgbColor = [255, 255, 255];
const COLOR_TEXT: RgbColor = [190, 75, 131];
const COLOR_ACCENT: RgbColor = [190, 75, 131];

export const { getStaticPaths, GET } = OGImageRoute({
	param: 'route',
	pages: import.meta.glob('/src/content/**/*.md', { eager: true }),
	getImageOptions: (_path, page: { frontmatter: Post }) => ({
		title: page.frontmatter.title,
		description: `By ${SITE_AUTHOR}`,
		bgGradient: [COLOR_BACKGROUND],
		padding: 48,
		border: {
			color: COLOR_ACCENT,
			width: 24,
			side: 'block-start',
		},
		font: {
			title: {
				color: COLOR_TEXT,
				size: 80,
				lineHeight: 1.1,
				families: ['Roboto Mono', 'sans-serif'],
			},
			description: {
				color: COLOR_TEXT,
				size: 40,
				lineHeight: 1.5,
				families: ['Roboto Mono', 'sans-serif'],
			},
		},
		fonts: [
			'https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf',
		],
	}),
});
