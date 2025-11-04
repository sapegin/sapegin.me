import { type Config } from '@pandacss/dev';

export const colors = {
	background: '#ffffff',
	text: '#3a3d40',
	secondary: '#75757c',
	light: '#94949e',
	border: '#3a3d40',
	primary: '#577290',
	accent: '#be4b83',
	selection: '#faebaf',
	codeBlack: '#565a67',
	codeGray: '#6c7693',
	codeGreen: '#00805e',
	codeOrange: '#ad5528',
	codeBlue: '#0f73a7',
	codePurple: '#7859a6',
	codeRed: '#b71818',
	coffeeText: '#754c06',
	coffeeBackground: '#fbc024',
	coffeeHover: '#3a3d40',
};

const colorsDark = {
	background: '#2e3033',
	text: '#e3e6e8',
	secondary: '#94949e',
	light: '#94949e',
	border: '#dbe2e9',
	primary: '#89abd2',
	accent: '#db76a7',
	selection: '#61656b',
	codeBlack: '#9397a5',
	codeGray: '#a7adbe',
	codeGreen: '#09b987',
	codeOrange: '#dbaf57',
	codeBlue: '#46a7ec',
	codePurple: '#ac92d3',
	codeRed: '#f96c78',
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
					heading: { value: "'Mondwest-Regular', sans-serif" },
					ui: { value: 'NeueBit, sans-serif' },
					code: { value: 'MonoLisa, monospace' },
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
					ui: { value: '1.5rem' }, // UI font is very small
				},
				spacing: {
					listMargin: { value: '0' },
				},
			},
		},
	},

	// TODO: Extract
	// Code styles
	globalCss: {
		pre: {
			display: 'block',
			lineHeight: 'code',
			fontSize: 's',
			fontFamily: 'code',
			fontStyle: 'normal',
			whiteSpace: 'pre-wrap',
			tabSize: 4,
			textSizeAdjust: 'none',
			// Expand background for dark themes
			height: '100%',
			marginInline: { base: '-m', tablet: '-s' },
			padding: { base: 'm', tablet: 's' },
			borderRadius: { tablet: 'default' },
		},
		'pre code': {
			display: 'block',
			fontSize: 'inherit',
			fontStyle: 'inherit',
			color: 'inherit',
		},
		'[data-highlighted-line]': {
			backgroundColor: { base: '#f5f5f7', _osDark: '#3a3d40' },
		},

		// HACK: Override default Astro/Shiki styles
		'.astro-code[style], .shiki[style]': {
			overflowX: 'visible!important',
		},
	},
} as const satisfies Config;
