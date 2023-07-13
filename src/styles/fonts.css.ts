import { globalFontFace } from '@vanilla-extract/css';

export const fonts = {
	base: 'Helvetica',
	heading: 'Mondwest-Regular',
	ui: 'NeueBit',
	code: 'MonoLisa',
};

globalFontFace(fonts.heading, {
	src: 'url("/fonts/Mondwest-Regular.woff2")',
	fontDisplay: 'fallback',
});

globalFontFace(fonts.ui, {
	src: 'url("/fonts/NeueBit-Bold.woff2")',
	fontDisplay: 'fallback',
});

globalFontFace(fonts.code, {
	src: 'url("/fonts/MonoLisa-Regular.woff2")',
	fontDisplay: 'fallback',
});
globalFontFace(fonts.code, {
	src: 'url("/fonts/MonoLisa-Bold.woff2")',
	fontDisplay: 'fallback',
	fontWeight: 'bold',
});
globalFontFace(fonts.code, {
	src: 'url("/fonts/MonoLisa-RegularItalic.woff2")',
	fontDisplay: 'fallback',
	fontStyle: 'italic',
});
