import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';
import { mediaQueries } from '../tamia/primitives/theme';

export const photo = style({
	width: 'auto',
	height: 'auto',
	maxWidth: `min(100%, 100vw)`,
	maxHeight: `min(900px, 100vh)`,
	'@media': {
		[mediaQueries.tablet]: {
			maxWidth: `min(100%, calc(100vw - ${vars.space.m}))`,
			maxHeight: `min(900px, calc(100vh - ${vars.space.m}))`,
		},
	},
});
