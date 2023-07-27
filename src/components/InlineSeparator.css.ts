import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const container = style({
	display: 'inline-block',
	width: '0.3rem',
	height: '0.3rem',
	backgroundColor: vars.colors.border,
});
