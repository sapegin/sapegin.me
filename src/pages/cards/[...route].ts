import { OGImageRoute } from 'astro-og-canvas';
import hexRgb from 'hex-rgb';
import { theme } from '../../styles/theme.css';
import { SITE_AUTHOR } from '../../constants';

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
		bgGradient: [hexToRgb(theme.colors.bg), hexToRgb(theme.colors.bg)],
		padding: 48,
		border: {
			color: hexToRgb(theme.colors.hover),
			width: 24,
			side: 'block-start',
		},
		font: {
			title: {
				color: hexToRgb(theme.colors.base),
				size: 80,
				lineHeight: Number(theme.lineHeights.heading),
				families: ['Roboto Mono', 'sans-serif'],
			},
			description: {
				color: hexToRgb(theme.colors.base),
				size: 40,
				lineHeight: Number(theme.lineHeights.base),
				families: ['Roboto Mono', 'sans-serif'],
			},
		},
		fonts: [
			'https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf',
		],
	}),
});
