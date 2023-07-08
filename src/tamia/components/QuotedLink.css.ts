import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';

export const link = style({
	padding: 0,
	background: 'none',
	border: 0,
	color: 'inherit',
	fontFamily: 'inherit',
	fontSize: 'inherit',
	lineHeight: 'inherit',
	textDecoration: 'none',
	':hover': {
		cursor: 'pointer',
	},
	':focus': {
		outline: vars.borders.focus,
		outlineColor: vars.colors.focus,
		outlineOffset: vars.focusOutlineOffset,
	},
});

globalStyle(`${link}:link u`, {
	color: vars.colors.primary,
});
globalStyle(`${link}:visited u`, {
	color: vars.colors.primary,
});
globalStyle(`${link}:hover u`, {
	color: vars.colors.hover,
});
globalStyle(`${link}:active u`, {
	color: vars.colors.hover,
});
