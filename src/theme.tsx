const baseFont = ['Helvetica', 'sans-serif'].join(',');
const space = {
	0: 0,
	xxs: '0.125rem', // 2px
	xs: '0.25rem', // 4px
	s: '0.5rem', // 8px
	m: '1rem', // 16px
	l: '2rem', // 32px
	xl: '4rem', // 64px
	xxl: '8rem', // 128px
	xxxl: '16rem', // 256px
	'-xxs': '0.125rem', // -2px
	'-xs': '0.25rem', // -4px
	'-s': '0.5rem', // -8px
	'-m': '1rem', // -16px
	'-l': '2rem', // -32px
	'-xl': '4rem', // -64px
	'-xxl': '8rem', // -128px
	'-xxxl': '16rem', // -256px
};
const breakpoints = [
	'38rem', // 608px
	'48rem', // 768px
	'62rem', // 992px
	'75rem', // 1200px
];
const fonts = {
	base: baseFont,
	heading: baseFont,
};
const fontSizes = {
	base: '1rem',
	xxxxl: '4.2rem',
	xxxl: '3.2rem',
	xxl: '2.4rem',
	xl: '1.8rem',
	l: '1.3rem',
	m: '1rem',
	s: '0.85rem',
	xs: '0.75rem',
};
const colors = {
	bg: '#fff',
	base: '#222',
	light: '#999',
	primary: '#c25400',
	hover: '#ff7d1a',
	focus: '#ff7d1a',
	selection: 'rgb(255,237,117)',
	selectionAlpha: 'rgba(255,237,117,0.25)',
};
const shadows = {
	cover: '0 0 3px rgba(0, 0, 0, 0.05)',
};
const borders = {
	focus: '3px solid',
};
const fontWeights = {
	base: 300,
	heading: 300,
};
const lineHeights = {
	base: 1.5,
	heading: 1.1,
};
const letterSpacings = {
	base: 0,
	heading: 0,
};
const headingBaseStyles = {
	color: colors.base,
	fontFamily: fonts.heading,
	fontWeight: fontWeights.heading,
	lineHeight: lineHeights.heading,
	letterSpacing: letterSpacings.heading,
};
const textBaseStyles = {
	color: colors.base,
	fontFamily: fonts.base,
	fontWeight: fontWeights.base,
	lineHeight: lineHeights.base,
	letterSpacing: letterSpacings.base,
};

export default {
	baseFontSize: '1.125em',
	blockMarginBottom: space.m,
	headingMarginTop: space.l,
	listMargin: '1.3em',
	focusOutlineOffset: '2px',
	page: {
		bodyMaxWidth: '52rem',
		bodyPaddingX: space.m,
		bodyPaddingY: '4vh',
		contentPaddingX: 0,
		contentPaddingY: 0,
		textMaxWidth: '40rem',
	},
	fonts,
	space,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	colors,
	shadows,
	borders,
	breakpoints,
	headingStyles: {
		1: {
			...headingBaseStyles,
			fontSize: fontSizes.xxl,
		},
		2: {
			...headingBaseStyles,
			fontSize: fontSizes.xl,
		},
		3: {
			...headingBaseStyles,
			fontSize: fontSizes.l,
		},
	},
	textStyles: {
		custom: {},
		base: {
			...textBaseStyles,
			fontSize: fontSizes.m,
		},
		xsmall: {
			...textBaseStyles,
			fontSize: fontSizes.xs,
		},
		small: {
			...textBaseStyles,
			fontSize: fontSizes.s,
		},
		large: {
			...textBaseStyles,
			fontSize: fontSizes.l,
		},
	},
} as const;
