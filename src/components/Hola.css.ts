import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const name = style({
	fontSize: 'clamp(2.6rem, 7vw, 4rem)',
	background: `linear-gradient(${vars.colors.hover}, ${vars.colors.primary})`,
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
});

export const icon = style({
	marginTop: -6,
});
