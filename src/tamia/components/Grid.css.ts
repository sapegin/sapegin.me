import { style } from '@vanilla-extract/css';

export const gridAutoNarrow = style({
	gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
});

export const gridAutoWide = style({
	gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
});
