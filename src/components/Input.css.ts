import { style } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';
import { colors } from '../styles/theme.css';
import { getPixelBorder } from '../util/getPixelBorder';

export const input = style([
	sprinkles({
		display: 'inline-block',
		p: 's',
		fontFamily: 'ui',
		fontSize: 'ui',
		borderColor: 'base',
		backgroundColor: 'bg',
		color: 'base',
	}),
	{
		height: '2.2rem',
		borderStyle: 'solid',
		borderWidth: 4,
		borderImageSlice: 4,
		borderImageWidth: 1,
		borderImageOutset: 0,
		borderImageSource: getPixelBorder(colors.base),
		lineHeight: '1rem',
		textDecoration: 'none',
		userSelect: 'none',
		outline: 0,
		':focus': {
			borderImageSource: getPixelBorder(colors.hover),
		},
	},
]);
