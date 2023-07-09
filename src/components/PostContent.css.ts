import { style, globalStyle } from '@vanilla-extract/css';
import { sprinkles } from '../styles/sprinkles.css';

export const postContent = style([
	sprinkles({
		fontSize: { mobile: 'm', tablet: 'mplus' },
		lineHeight: { mobile: 'small', tablet: 'base' },
	}),
	{},
]);

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
