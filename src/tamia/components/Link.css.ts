import { style } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';

export const link = style({
	padding: 0,
	background: 'none',
	border: 0,
	fontFamily: 'inherit',
	fontSize: 'inherit',
	lineHeight: 'inherit',
	textDecoration: 'underline',
	':link': { color: vars.colors.primary },
	':visited': { color: vars.colors.primary },
	':hover': {
		color: vars.colors.hover,
		cursor: 'pointer',
	},
	':active': {
		color: vars.colors.hover,
		cursor: 'pointer',
	},
	':focus': {
		outline: vars.borders.focus,
		outlineColor: vars.colors.focus,
		outlineOffset: vars.focusOutlineOffset,
	},
});
