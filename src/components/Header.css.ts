import { style } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';
import { LOGO_WIDTH } from './Logo';
import { vars } from '../styles/theme.css';

export const logo = style({
	marginBottom: vars.space.m,
	'@media': {
		[mediaQueries.tablet]: {
			width: LOGO_WIDTH,
			marginBottom: '-2.6rem',
		},
	},
});
