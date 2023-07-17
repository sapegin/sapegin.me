import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';
import { theme, mediaQueries } from '../primitives/theme';

const halfBlockMarginBottom = `calc(${vars.blockMarginBottom} / 2)`;
const negativeContentPaddingX = `calc(${vars.page.contentPaddingX} * -1)`;

export const textContent = style({});

globalStyle(
	`${textContent} :is(h1, h2, h3, h4, h5, h6, ul, ol, dl, dd, p, pre, table, blockquote, form, iframe, img, hr, address)`,
	{
		marginBottom: vars.blockMarginBottom,
	}
);
globalStyle(`${textContent} :is(h1, h2, h3, h4, h5, h6, p, li, blockquote)`, {
	maxWidth: vars.page.textMaxWidth,
});

// Links
globalStyle(`${textContent} :is(a, a:link, a:visited)`, {
	color: vars.colors.primary,
});
globalStyle(`${textContent} :is(a:hover, a:active)`, {
	color: vars.colors.hover,
});
globalStyle(`${textContent} a:focus`, {
	outline: vars.borders.focus,
	outlineColor: vars.colors.focus,
	outlineOffset: vars.focusOutlineOffset,
});

// Blockquotes
globalStyle(`${textContent} blockquote`, {
	marginInline: theme.space.l,
	fontSize: vars.fontSizes.s,
});
globalStyle(`${textContent} blockquote p`, {
	marginBottom: halfBlockMarginBottom,
});
globalStyle(`${textContent} cite`, {
	fontStyle: 'italic',
});

globalStyle(`${textContent} hr`, {
	border: 0,
	background: vars.colors.border,
});

// Responsive images and full bleed images
globalStyle(
	`${textContent} :is(p > img, p > a > img, figure > img, figure > a > img)`,
	{
		height: 'auto',
		maxWidth: `calc(100% + ${vars.page.contentPaddingX} * 2)`,
		marginInline: negativeContentPaddingX,
		marginTop: halfBlockMarginBottom,
		'@media': {
			[mediaQueries.tablet]: {
				maxWidth: '100%',
				marginInline: 'auto',
			},
		},
	}
);

// Tables
globalStyle(`${textContent} table`, {
	fontSize: vars.fontSizes.s,
	borderCollapse: 'collapse',
	width: '100%',
});
globalStyle(`${textContent} thead`, {
	textAlign: 'left',
	borderBottom: `2px solid ${vars.colors.border}`,
});
globalStyle(`${textContent} :is(td, th)`, {
	textAlign: 'left',
	borderBottom: `1px solid ${vars.colors.border}`,
	padding: halfBlockMarginBottom,
});
globalStyle(`${textContent} td`, {
	verticalAlign: 'top',
});
globalStyle(`${textContent} :is(th:first-child, td:first-child)`, {
	paddingLeft: 0,
});
globalStyle(`${textContent} :is(th:last-child, td:last-child)`, {
	paddingRight: 0,
});
globalStyle(`${textContent} :is(tr:last-child th, tr:last-child td)`, {
	border: 0,
});

// Headings
globalStyle(`${textContent} :is(h1, h2, h3, h4, h5, h6)`, {
	marginTop: vars.headingMarginTop,
	fontFamily: vars.fonts.heading,
	lineHeight: vars.lineHeights.heading,
	fontWeight: vars.fontWeights.heading,
	letterSpacing: vars.letterSpacings.heading,
});
globalStyle(`${textContent} h1`, {
	fontSize: vars.fontSizes.xxl,
});
globalStyle(`${textContent} h2`, {
	fontSize: vars.fontSizes.xl,
});
globalStyle(`${textContent} h3`, {
	fontSize: vars.fontSizes.l,
});
globalStyle(`${textContent} h4`, {
	fontSize: vars.fontSizes.m,
	lineHeight: vars.lineHeights.base,
	fontWeight: 'bold',
});
globalStyle(`${textContent} h5`, {
	fontSize: vars.fontSizes.m,
	lineHeight: vars.lineHeights.base,
	fontStyle: 'italic',
});
globalStyle(`${textContent} h6`, {
	fontSize: vars.fontSizes.m,
	lineHeight: vars.lineHeights.base,
});

// Collapse margin between headings and before first heading
globalStyle(
	`${textContent} :is(h1 + h2, h2 + h3, h3 + h4, h4 + h5, h5 + h6, h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child)`,
	{
		marginTop: 0,
	}
);

// Unordered list with dashes (—) as bullets and basic ordered list
globalStyle(`${textContent} ol`, {
	paddingLeft: vars.listMargin,
});
globalStyle(`${textContent} li`, {
	paddingLeft: halfBlockMarginBottom,
});
globalStyle(`${textContent} :is(li > ul,  li > ol)`, {
	marginBottom: 0,
});
globalStyle(`${textContent} :is(ul > ul,  ul > ol)`, {
	marginLeft: vars.listMargin,
});
globalStyle(`${textContent} ul > li`, {
	position: 'relative',
	paddingLeft: vars.listMargin,
	marginLeft: 0,
});
globalStyle(`${textContent} ul > li::before`, {
	content: '\\2014\\a0',
	position: 'absolute',
	left: 0,
});

// Hanging markers on big screens
globalStyle(`${textContent} ol`, {
	'@media': {
		[mediaQueries.tablet]: {
			paddingLeft: 0,
		},
	},
});
globalStyle(`${textContent} ol`, {
	'@media': {
		[mediaQueries.tablet]: {
			marginLeft: `calc(${vars.listMargin} * -1)`,
		},
	},
});

// Code
globalStyle(`${textContent} :is(code, kbd)`, {
	fontFamily: 'inherit',
	fontStyle: 'italic',
	fontFeatureSettings: 'normal',
	hyphens: 'none',
});

// Don't leak the margin after the last element outside of the component
globalStyle(`${textContent} > *:last-child`, {
	marginBottom: 0,
});
