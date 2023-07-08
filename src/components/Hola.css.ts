import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const name = style({
	background: `-webkit-linear-gradient(${vars.colors.hover}, ${vars.colors.primary})`,
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
});
