import { defineRecipe, type Config } from '@pandacss/dev';
import { getPixelBorder } from './util/getPixelBorder';

export const colors = {
	bg: '#fff',
	base: '#3a3d40',
	light: '#94949e',
	border: '#3a3d40',
	primary: '#577290',
	accent: '#c45a8d',
};
export const lineHeights = {
	base: '1.5',
	small: '1.4',
	heading: '1.1',
	code: '1.3',
};

// TODO: Extract
// HACK: Looks like borderImageSource doesn't work in Panda's cva()
const buttonRecipe = defineRecipe({
	className: 'button',
	base: {
		display: 'inline-block',
		px: { base: 'm', tablet: 'l' },
		fontFamily: 'ui',
		borderColor: 'base',
		backgroundColor: 'bg',
		color: { base: 'base', _hover: 'accent', _focus: 'accent' },
		borderStyle: 'solid',
		borderWidth: 4,
		borderImageSlice: 4,
		borderImageWidth: 1,
		borderImageOutset: 0,
		borderImageSource: getPixelBorder(colors.base),
		lineHeight: '1rem',
		textDecoration: 'none',
		userSelect: 'none',
		outline: 0,
		_hover: {
			cursor: 'pointer',
			borderImageSource: getPixelBorder(colors.accent),
		},
		_active: {
			transform: 'translateY(1px)',
		},
		_focus: {
			borderImageSource: getPixelBorder(colors.accent),
		},
		'&::-moz-focus-inner': {
			border: 0,
		},
	},
	variants: {
		variant: {
			medium: {
				height: '2.2rem',
				py: 's',
				fontSize: 'ui',
			},
			large: {
				py: 'm',
				fontSize: 'xl',
			},
		},
	},
});

export const theme = {
	theme: {
		extend: {
			tokens: {
				colors: {
					bg: { value: colors.bg },
					base: { value: colors.base },
					light: { value: colors.light },
					border: { value: colors.border },
					primary: { value: colors.primary },
					accent: { value: colors.accent },
				},
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
					xl: { value: '1.9rem' },
					l: { value: '1.4rem' },
					m: { value: '1rem' },
					s: { value: '0.9rem' },
					xs: { value: '0.75rem' },
					ui: { value: '1.5rem' }, // UI font is very small
				},
				fontWeights: {
					normal: { value: '300' },
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
			},
			semanticTokens: {
				fontSizes: {
					root: { value: '1.125em' },
					article: { value: '1.1rem' },
					ui: { value: '1.5rem' }, // UI font is very small
				},
				spacing: {
					listMargin: { value: '0' },
				},
			},
			recipes: {
				button: buttonRecipe,
			},
		},
	},

	// TODO: Extract
	// Code styles
	globalCss: {
		'.astro-code, .shiki, [data-rehype-pretty-code-figure] pre': {
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

		'.astro-code code, .shiki code, [data-rehype-pretty-code-figure] code': {
			display: 'block',
			fontSize: 'inherit',
			fontStyle: 'inherit',
			color: 'inherit',
		},
		'[data-highlighted-line]': {
			backgroundColor: '#f5f5f7', // Squirrelsong Light gray0f
		},

		// HACK: Override default Astro/Shiki styles
		'.astro-code[style], .shiki[style]': {
			overflowX: 'visible!important',
		},
	},
} as const satisfies Config;
