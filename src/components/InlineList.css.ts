import { style, globalStyle } from '@vanilla-extract/css';

export const listItem = style({});

globalStyle(`${listItem}:not(:last-child)::after`, {
	content: '■',
	margin: '0 1ch',
	fontStyle: 'normal',
	fontSize: '0.8rem',
});
