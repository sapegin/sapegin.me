import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from '../styles/sprinkles.css';

export const text = recipe({
	base: [
		sprinkles({
			color: 'base',
			fontFamily: 'base',
			fontWeight: 'base',
			lineHeight: 'base',
			letterSpacing: 'base',
		}),
	],
	variants: {
		variant: {
			base: sprinkles({ fontSize: 'm' }),
			xsmall: sprinkles({ fontSize: 'xs' }),
			small: sprinkles({ fontSize: 's' }),
			large: sprinkles({ fontSize: 'l', lineHeight: 'heading' }),
			menu: sprinkles({
				fontFamily: 'ui',
				fontSize: 'ui',
				textTransform: 'uppercase',
			}),
			intro: sprinkles({ fontSize: 'mplus', fontStyle: 'italic' }),
		},
	},
	defaultVariants: {
		variant: 'base',
	},
});

export type TextVariants = RecipeVariants<typeof text>;
