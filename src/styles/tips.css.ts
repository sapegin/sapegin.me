import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

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
