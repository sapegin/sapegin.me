import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const listItem = style({});

globalStyle(`${listItem}:not(:last-child)::after`, {
	content: '',
	display: 'inline-block',
	marginInline: vars.space.s,
	marginBottom: '0.1rem',
	width: '0.3rem',
	height: '0.3rem',
	backgroundColor: vars.colors.border,
});
