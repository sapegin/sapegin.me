import { style, globalStyle } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';
import { vars } from '../styles/theme.css';
import { mediaQueries } from '../tamia/primitives/theme';

export const postContent = style([
	sprinkles({
		fontSize: { mobile: 'm', tablet: 'mplus' },
		lineHeight: { mobile: 'small', tablet: 'base' },
	}),
	{},
]);

globalStyle(`${postContent} ol`, {
	marginLeft: 0,
});

globalStyle(`${postContent} ul > li`, {
	paddingLeft: '1em',
});
globalStyle(`${postContent} ul > li::before`, {
	content: '',
	top: '.5em',
	left: '.1em',
	width: '.3em',
	height: '.3em',
	backgroundColor: vars.colors.base,
	'@media': {
		[mediaQueries.tablet]: {
			top: '.6em',
		},
	},
});

globalStyle(`${postContent} hr`, {
	textAlign: 'center',
	backgroundColor: 'transparent',
	border: 'none',
	// Make top and bottom margins more or less the same
	marginBlock: '2.5rem',
});
globalStyle(`${postContent} hr::after`, {
	content: '···',
	letterSpacing: '0.7em',
});
