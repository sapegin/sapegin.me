import { style, globalStyle } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';
import { vars } from '../styles/theme.css';

export const span = style([
	sprinkles({
		paddingInline: 's',
		paddingTop: 'xxs',
		fontFamily: 'ui',
		fontSize: 'ui',
		color: 'bg',
		backgroundColor: 'base',
	}),
	{
		display: 'inline-block',
		letterSpacing: '0.05ex',
		fontWeight: 300,
		lineHeight: 0.8,
		textTransform: 'uppercase',
		textDecoration: 'none',
	},
]);

globalStyle(`a:hover ${span}`, {
	backgroundColor: vars.colors.hover,
});
