// Copied from vanilla-extract, they don't export many types
export type Tokens = {
	[key: string]: string | Tokens;
};

export interface Theme {
	// Media queries
	conditions: Tokens;

	// Design tokens
	colors: {
		base: string;
		bg: string;
		primary: string;
		hover: string;
		focus: string;
		selection: string;
		[key: string]: string | Tokens;
	};
	fonts: {
		base: string;
		heading: string;
		[key: string]: string | Tokens;
	};
	fontSizes: {
		s: string;
		m: string;
		l: string;
		xl: string;
		xxl: string;
		[key: string]: string | Tokens;
	};
	fontWeights: {
		base: string;
		heading: string;
		[key: string]: string | Tokens;
	};
	lineHeights: {
		base: string;
		heading: string;
		[key: string]: string | Tokens;
	};
	letterSpacings: {
		base: string;
		heading: string;
		[key: string]: string | Tokens;
	};
	borders: {
		focus: string;
		[key: string]: string | Tokens;
	};
	space: Tokens;
	sizes: Tokens;
	borderStyles: Tokens;
	borderWidths: Tokens;
	radii: Tokens;
	shadows: Tokens;
	transitions: Tokens;

	// Tamia extensions
	baseFontSize: string;
	listMargin: string;
	blockMarginBottom: string;
	headingMarginTop: string;
	focusOutlineOffset: string;
	page: {
		contentMaxWidth: string;
		contentPaddingX: string;
		contentPaddingY: string;
		textMaxWidth: string;
	};
}
