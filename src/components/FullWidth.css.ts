import { style } from '@vanilla-extract/css';

export const container = style({
	width: '100vw',
	marginLeft: 'calc(50% - 50vw)',
});

export const inner = style({
	maxWidth: '1200px',
	marginInline: 'auto',
});
