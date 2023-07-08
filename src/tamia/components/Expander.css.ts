import { style } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';
import { mediaQueries } from '../primitives/theme';

export const expander = style({
	marginInline: `calc(${vars.page.contentPaddingX} * -2)`,
	'@media': {
		[mediaQueries.tablet]: {
			marginInline: 0,
		},
	},
});
