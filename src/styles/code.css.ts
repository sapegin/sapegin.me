import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle(`.astro-code, .shiki`, {
	display: 'block',
	lineHeight: vars.lineHeights.code,
	fontSize: vars.fontSizes.s,
	fontFamily: vars.fonts.code,
	whiteSpace: 'pre-wrap',
	tabSize: 4,
	textSizeAdjust: 'none',
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
