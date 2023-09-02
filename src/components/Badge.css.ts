import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const badge = style({
	color: vars.colors.hover,
	borderWidth: 1,
	borderStyle: 'solid',
	borderRadius: vars.radii.large,
	fontSize: vars.fontSizes.xs,
});

export const inverted = style({
	color: vars.colors.bg,
	background: vars.colors.hover,
});
