import { OGImageRoute } from 'astro-og-canvas';
import hexRgb from 'hex-rgb';
import { SITE_AUTHOR } from '../../constants';
import { colors, lineHeights } from '../../theme';

const hexToRgb = (hex: string): [number, number, number] => {
	const { red, green, blue } = hexRgb(hex);
	return [red, green, blue];
};

export const { getStaticPaths, GET } = OGImageRoute({
	param: 'route',
	pages: import.meta.glob('/src/content/**/*.md', { eager: true }),
	getImageOptions: (_path, page) => ({
		title: page.frontmatter.title,
		description: `By ${SITE_AUTHOR}`,
		bgGradient: [hexToRgb(colors.background), hexToRgb(colors.background)],
		padding: 48,
		border: {
			color: hexToRgb(colors.accent),
			width: 24,
			side: 'block-start',
		},
		font: {
			title: {
				color: hexToRgb(colors.text),
				size: 80,
				lineHeight: Number(lineHeights.heading),
				families: ['Roboto Mono', 'sans-serif'],
			},
			description: {
				color: hexToRgb(colors.text),
				size: 40,
				lineHeight: Number(lineHeights.base),
				families: ['Roboto Mono', 'sans-serif'],
			},
		},
		fonts: [
			'https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf',
		],
	}),
});
