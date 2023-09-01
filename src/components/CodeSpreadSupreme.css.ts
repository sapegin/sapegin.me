import { style, globalStyle } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';

export const grid = style({
	gridTemplateColumns: '1fr',
	gridTemplateAreas: `"light1" "dark1" "light2" "dark2" "light3" "dark3"`,
	'@media': {
		[mediaQueries.tablet]: {
			gridTemplateColumns: '1fr 1fr',
			gridTemplateAreas: `"light1 dark1" "light2 dark2" "light3 dark3"`,
		},
		[mediaQueries.desktop]: {
			gridTemplateColumns: '1fr 1fr 1fr',
			gridTemplateAreas: `"light1 light2 light3" "dark1 dark2 dark3"`,
		},
	},
});

globalStyle(`${grid} :nth-child(1)`, {
	gridArea: 'light1',
});
globalStyle(`${grid} :nth-child(2)`, {
	gridArea: 'light2',
});
globalStyle(`${grid} :nth-child(3)`, {
	gridArea: 'light3',
});
globalStyle(`${grid} :nth-child(4)`, {
	gridArea: 'dark1',
});
globalStyle(`${grid} :nth-child(5)`, {
	gridArea: 'dark2',
});
globalStyle(`${grid} :nth-child(6)`, {
	gridArea: 'dark3',
});
