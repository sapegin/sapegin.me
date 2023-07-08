import { style } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';

// TODO: ???? Not sure we still need this concept

export const container = style({
	maxWidth: vars.page.contentMaxWidth,
	marginInline: 'auto',
	paddingInline: vars.page.contentPaddingX,
});
