import { globalFontFace } from '@vanilla-extract/css';

export const fonts = {
	base: 'Helvetica',
	heading: 'PPMondwest-Regular',
	ui: 'PPNeueBit',
	code: 'MonoLisa',
};

globalFontFace(fonts.heading, {
	src: 'url("/fonts/PPMondwest-Regular.otf")',
	fontDisplay: 'fallback',
});

globalFontFace(fonts.ui, {
	src: 'url("/fonts/PPNeueBit-Bold.otf")',
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
