import { style } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';

export const addon = style([
	sprinkles({
		py: 'l',
		borderColor: 'hover',
	}),
	{
		borderStyle: `solid`,
		borderWidth: `2px 0`,
	},
]);
