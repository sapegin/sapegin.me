import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';

globalStyle('html', {
	fontSize: vars.baseFontSize,
	fontFamily: vars.fonts.base,
	// Prevent adjustments of font size after orientation changes in iOS
	WebkitTextSizeAdjust: '100%',
});

// Box-sizing reset
globalStyle(':is(*, *::before, *::after)', {
	boxSizing: 'border-box',
});

globalStyle('body', {
	minHeight: '100vh',
	color: vars.colors.base,
	backgroundColor: vars.colors.bg,
	lineHeight: vars.lineHeights.base,
	fontWeight: vars.fontWeights.base,
	wordWrap: 'break-word',
	textRendering: 'optimizeSpeed',
	fontKerning: 'normal',
	fontFeatureSettings: '"kern", "liga", "clig", "calt"',
	hyphens: 'auto',

	'@media': {
		// Enable smooth scroll only for folks who don't have reduce motion enabled
		'(prefers-reduced-motion: no-preference)': {
			scrollBehavior: 'smooth',
		},
	},
});

// Disable hyphenation in links
globalStyle('a', {
	hyphens: 'none',
});

// Remove default margins and paddings
globalStyle(
	':is(body, h1, h2, h3, h4, h5, h6, ul, ol, dl, dd, p, figure, figcaption, pre, table, fieldset, blockquote, form, iframe, img, hr, address)',
	{
		margin: 0,
		padding: 0,
	}
);

// Remove bullets
globalStyle('ul', {
	listStyle: 'none',
});

globalStyle(':is(h1, h2, h3, h4, h5, h6)', {
	textRendering: 'optimizeLegibility',
});

// Monospace digits
globalStyle('table', {
	fontFeatureSettings: '"tnum"',
});

// Remove ugly bottom border
globalStyle(':is(abbr, acronym)', {
	borderBottom: 0,
	cursor: 'default',
});

// Abbreviations with spacing
globalStyle('abbr', {
	letterSpacing: '0.1em',
	marginRight: '-0.1em',
});

// Remove the weird gap below images
globalStyle('img', {
	verticalAlign: 'middle',
});

// Do not allow horizontal resizing because it breaks layout
globalStyle('textarea', {
	resize: 'vertical',
});

// Remove default borders
globalStyle(':is(iframe, fieldset)', {
	border: 0,
});

// Text selection
globalStyle('::selection', {
	color: vars.colors.base,
	backgroundColor: vars.colors.selection,
	textShadow: 'none',
});

// iOS tap highlighting
globalStyle('a:link', {
	WebkitTapHighlightColor: 'rgba(255,237,117,0.25)',
});
