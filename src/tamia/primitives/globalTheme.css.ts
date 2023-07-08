import { createGlobalThemeContract } from '@vanilla-extract/css';

export const globalThemeContract = {
	colors: {
		base: 'color-base',
		bg: 'color-bg',
		primary: 'color-primary',
		hover: 'color-hover',
		focus: 'color-focus',
		border: 'color-border',
		selection: 'color-selection',
	},
	fonts: {
		base: 'base-heading',
		heading: 'font-heading',
	},
	fontSizes: {
		s: 'font-size-s',
		m: 'font-size-m',
		l: 'font-size-l',
		xl: 'font-size-xl',
		xxl: 'font-size-xxl',
	},
	fontWeights: {
		base: 'font-weight-base',
		heading: 'font-weight-heading',
	},
	lineHeights: {
		base: 'line-height-base',
		small: 'line-height-small',
		heading: 'line-height-heading',
	},
	letterSpacings: {
		base: 'letter-spacing-base',
		heading: 'letter-spacing-heading',
	},
	borders: {
		focus: 'border-focus',
	},
	baseFontSize: 'base-font-size',
	listMargin: 'list-margin',
	blockMarginBottom: 'block-margin-bottom',
	headingMarginTop: 'heading-margin-top',
	focusOutlineOffset: 'focus-outline-offset',
	page: {
		textMaxWidth: 'text-max-width',
		contentMaxWidth: 'content-max-width',
		contentPaddingX: 'content-padding-x',
	},
} as const;

export const vars = createGlobalThemeContract(globalThemeContract);
