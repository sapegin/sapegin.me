import { style } from '@vanilla-extract/css';
import { vars } from '../primitives/globalTheme.css';
import { mediaQueries } from '../primitives/theme';

export const expander = style({
	marginInline: `calc(${vars.page.contentPaddingX} * -1)`,
	'@media': {
		[mediaQueries.tablet]: {
			marginInline: 0,
		},
	},
});
