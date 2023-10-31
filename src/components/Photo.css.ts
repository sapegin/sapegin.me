import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const photo = style({
	maxWidth: `min(900px, calc(100vw - ${vars.space.m}))`,
	maxHeight: `min(900px, calc(100vh - ${vars.space.m}))`,
	width: 'auto',
	height: 'auto',
});
