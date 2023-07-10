import { style } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';

export const addon = style([
	sprinkles({
		mx: '-m',
		px: 'm',
		py: 'l',
		borderColor: 'hover',
	}),
	{
		borderStyle: `solid`,
		borderWidth: `2px 0`,
		background: 'linear-gradient(0deg, #57729030 0%, #c45a8d30 100%)',
	},
]);
