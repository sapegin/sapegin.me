import { style } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';

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
