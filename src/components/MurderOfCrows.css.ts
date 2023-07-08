import { style } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';
import { vars } from '../styles/theme.css';

export const container = style({
	width: '50%',
	marginInline: 'auto',
	paddingRight: '1.5rem',
	textAlign: 'right',
	borderBottomStyle: 'solid',
	borderBottomWidth: 1,
	borderBottomColor: vars.colors.light,
});
