import { globalStyle } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';
import { vars } from './theme.css';

globalStyle(`.astro-code, .shiki`, {
	display: 'block',
	lineHeight: vars.lineHeights.code,
	fontSize: vars.fontSizes.s,
	fontFamily: vars.fonts.code,
	whiteSpace: 'pre-wrap',
	tabSize: 4,
	textSizeAdjust: 'none',
	// Expand background for dark themes
	height: '100%',
	marginInline: vars.space['-m'],
	padding: vars.space.m,
	'@media': {
		[mediaQueries.tablet]: {
			marginInline: vars.space['-s'],
			padding: vars.space.s,
			borderRadius: vars.radii.default,
		},
	},
});
globalStyle(`.astro-code code, .shiki code`, {
	display: 'block',
	fontSize: 'inherit',
	fontStyle: 'inherit',
	color: 'inherit',
});

// HACK: Override default Astro/Shiki styles
globalStyle(`.astro-code[style], .shiki[style]`, {
	overflowX: 'visible!important' as 'visible',
});
