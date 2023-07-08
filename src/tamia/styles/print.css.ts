import { globalStyle } from '@vanilla-extract/css';

globalStyle('@page', {
	'@media': {
		print: {
			margin: '0.5cm 1cm',
		},
	},
});
globalStyle(':is(header, footer, nav, .no-print)', {
	'@media': {
		print: {
			display: 'none',
		},
	},
});
globalStyle('*', {
	'@media': {
		print: {
			fontFamily: 'Georgia, serif',
			color: '#000 !important',
			background: 'transparent !important',
			width: 'auto !important',
			marginLeft: '0 !important',
			marginRight: '0 !important',
			paddingLeft: '0 !important',
			paddingRight: '0 !important',
			textShadow: 'none !important',
			boxShadow: 'none !important',
		},
	},
});
globalStyle(':is(h1, h2, h3, h4, h5, h6)', {
	'@media': {
		print: {
			fontFamily: '"Helvetica Neue", Arial, sans-serif',
			pageBreakInside: 'avoid',
			pageBreakAfter: 'avoid',
		},
	},
});
globalStyle(':is(p, blockquote, ul, ol, dl, tr, img)', {
	'@media': {
		print: {
			pageBreakInside: 'avoid',
		},
	},
});
globalStyle(':is(p, h2, h3)', {
	'@media': {
		print: {
			orphans: 3,
			widows: 3,
		},
	},
});
globalStyle('ul', {
	'@media': {
		print: {
			marginLeft: '1.2em !important',
		},
	},
});
