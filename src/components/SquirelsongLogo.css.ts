import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const logo = style({
	fontFamily: vars.fonts.code,
	fontSize: 'clamp(2.6rem, 7vw, 4rem)',
	fontFeatureSettings: 'normal',
});
