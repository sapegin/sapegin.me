import getTheme from 'tamia/lib/theme';

const font = ['Helvetica', 'sans-serif'];

const theme = getTheme({
	baseFontSize: '1.125em',
	page: {
		maxWidth: '52rem',
		yPadding: '4vh',
	},
	fonts: {
		base: font,
		heading: font,
	},
	fontWeights: {
		base: 300,
		heading: 300,
	},
	lineHeights: {
		base: 1.5,
	},
	colors: {
		bg: '#fff',
		base: '#222',
		light: '#999',
		primary: '#c25400',
		hover: '#f56a00',
	},
});

export default theme;
