import type { Theme } from './types';

export const breakpoints = [
	'38rem', // 608px
	'48rem', // 768px
	'62rem', // 992px
];

export const mediaQueries = {
	mobile: '',
	tablet: `screen and (min-width: ${breakpoints[1]})`,
	desktop: `screen and (min-width: ${breakpoints[2]})`,
	mobileOnly: `screen and (max-width: ${breakpoints[1]})`,
};

export const conditions = {
	mobile: {},
	tablet: { '@media': mediaQueries.tablet },
	desktop: { '@media': mediaQueries.desktop },
};

export const space = {
	0: '0',
	xxs: '0.125rem', // 2px
	xs: '0.25rem', // 4px
	s: '0.5rem', // 8px
	m: '1rem', // 16px
	l: '2rem', // 32px
	xl: '4rem', // 64px
	xxl: '8rem', // 128px
	xxxl: '16rem', // 256px
	'-xxs': '-0.125rem', // 2px
	'-xs': '-0.25rem', // 4px
	'-s': '-0.5rem', // 8px
	'-m': '-1rem', // 16px
	'-l': '-2rem', // 32px
	'-xl': '-4rem', // 64px
	'-xxl': '-8rem', // 128px
	'-xxxl': '-16rem', // 256px
};

export const theme = {
	conditions,
	space,
	fonts: {
		base: 'Helvetica, sans-serif',
		heading: 'Helvetica, sans-serif',
	},
	fontSizes: {
		s: 'font-size-s',
		m: 'font-size-m',
		l: 'font-size-l',
		xl: 'font-size-xl',
		xxl: 'font-size-xxl',
	},
	fontWeights: {
		base: 'normal',
		heading: 'bold',
	},
	colors: {
		base: 'black',
		bg: 'snow',
		primary: 'royalblue',
		hover: 'royalblue',
		focus: 'midnightblue',
		border: 'silver',
		selection: 'gold',
	},
	borders: {
		focus: '3px solid',
	},
	lineHeights: {
		base: '1.5',
		heading: '1.1',
	},
	letterSpacings: {
		base: '0',
		heading: '0',
	},
	borderStyles: {},
	borderWidths: {},
	radii: {
		default: '2px',
	},
	shadows: {},
	transitions: {},
	sizes: {},
	blockMarginBottom: space.m,
	headingMarginTop: space.l,
	baseFontSize: '1em',
	listMargin: '1.3em',
	focusOutlineOffset: '2px',
	page: {
		textMaxWidth: '40rem',
		contentMaxWidth: '52rem',
		contentPaddingX: space.m,
		contentPaddingY: space.m,
	},
} as const satisfies Theme;
