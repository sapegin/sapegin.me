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

// HACK: Increase specificity to override post content styles (Astro production
// build imports CSS in a different order)
globalStyle(`${postContent}${postContent} ol`, {
	marginLeft: 0,
});

globalStyle(`${postContent}${postContent} ul > li`, {
	paddingLeft: '1em',
});
globalStyle(`${postContent}${postContent} ul > li::before`, {
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

globalStyle(`${postContent}${postContent} hr`, {
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

globalStyle(`.tip`, {
	marginBlock: vars.space.l,
	fontSize: vars.fontSizes.s,
	fontFamily: vars.fonts.base,
	fontStyle: 'italic',
});
globalStyle(`.tip:first-child`, {
	marginTop: 0,
});
globalStyle(`.tip + .tip`, {
	marginTop: vars.space.m,
});

globalStyle(`.tip__title`, {
	display: 'block',
	marginBottom: vars.space.xxs,
	fontStyle: 'normal',
});
