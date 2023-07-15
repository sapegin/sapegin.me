import { style } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';
import { colors } from '../styles/theme.css';

// Half of total menu items
export const HALF = 3;

export const menu = style({
	gridTemplateColumns: `repeat(${HALF}, 1fr)`,
	'@media': {
		[mediaQueries.tablet]: {
			gridTemplateColumns: `repeat(${HALF}, min-content) auto repeat(${HALF}, min-content)`,
		},
	},
});

export const link = style({
	textDecoration: 'none',
});

export const active = style({
	textShadow: `2px 2px ${colors.primary}66`,
});
