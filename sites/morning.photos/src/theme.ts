import { type Config } from '@pandacss/dev';

export const colors = {
	background: '#fff',
	text: '#3a3d40',
	secondary: '#75757c',
	light: '#94949e',
	border: '#3a3d40',
	primary: '#776487',
	accent: '#c25341',
	selection: '#faebaf',
	gradient1: '#90b7e3',
	gradient2: '#72597d',
	coffeeText: '#754c06',
	coffeeBackground: '#fbc024',
	coffeeHover: '#3a3d40',
};

const colorsDark = {
	background: '#313131',
	text: '#e3e6e8',
	secondary: '#94949e',
	light: '#94949e',
	border: '#dbe2e9',
	primary: '#b28bbd',
	accent: '#dc7f71',
	selection: '#61656b',
	gradient1: '#89abd2',
	gradient2: '#b28bbd',
	coffeeText: '#754c06',
	coffeeBackground: '#fbc024',
	coffeeHover: '#2e3033',
};

export const lineHeights = {
	base: '1.5',
	small: '1.4',
	heading: '1.1',
	code: '1.3',
};

function createPalette(
	light: Record<string, string>,
	dark: Record<string, string>
) {
	const palette: Record<string, { value: { base: string; _osDark: string } }> =
		{};
	for (const name in light) {
		palette[name] = {
			value: { base: light[name], _osDark: dark[name] },
		};
	}
	return palette;
}

export const theme = {
	theme: {
		extend: {
			tokens: {
				fonts: {
					body: { value: "'Helvetica Neue', Arial, sans-serif" },
					heading: { value: "'Helvetica Neue', Arial, sans-serif" },
					ui: { value: "'Helvetica Neue', Arial, sans-serif" },
					code: { value: 'monospace' },
				},
				fontSizes: {
					base: { value: '1rem' },
					xxxl: { value: '3.2rem' },
					xxl: { value: '2.4rem' },
					xl: { value: '2rem' },
					l: { value: '1.7rem' },
					m: { value: '1rem' },
					s: { value: '0.9rem' },
					xs: { value: '0.75rem' },
				},
				fontWeights: {
					normal: { value: '400' },
					heading: { value: '300' },
					bold: { value: '800' },
				},
				lineHeights: {
					base: { value: lineHeights.base },
					small: { value: lineHeights.small },
					heading: { value: lineHeights.heading },
					code: { value: lineHeights.code },
				},
				letterSpacings: {
					base: { value: '0' },
					heading: { value: '0' },
					menu: { value: '0.1ch' },
				},
				radii: {
					// TODO: default -> base
					default: { value: '2px' },
					large: { value: '3px' },
				},
				easings: {
					fade: { value: 'ease-out' },
					fadeout: { value: 'ease-out' },
					hover: { value: 'ease-in' },
				},
				durations: {
					fade: { value: '0.15s' },
					fadeout: { value: '1s' },
					hover: { value: '0.1s' },
				},
			},
			semanticTokens: {
				colors: createPalette(colors, colorsDark),
				fontSizes: {
					root: { value: '1.125em' },
					article: { value: '1.2rem' },
					ui: { value: '1.1rem' },
				},
				spacing: {
					listMargin: { value: '0' },
				},
			},
		},
	},
	globalCss: {},
} as const satisfies Config;
