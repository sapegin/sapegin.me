import { style } from '@vanilla-extract/css';
// import { vars } from '../tamia/primitives/globalTheme.css';
import { sprinkles } from '../styles/sprinkles.css';

// TODO: There's more: https://github.com/sapegin/blog.sapegin.me/blob/master/src/components/PostContent.tsx

export const postContent = style([
	sprinkles({
		fontSize: { mobile: 'm', tablet: 'mplus' },
		lineHeight: { mobile: 'small', tablet: 'base' },
	}),
	{},
]);
