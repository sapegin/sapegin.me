import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from '../styles/sprinkles.css';

export const heading = recipe({
	base: [
		sprinkles({
			color: 'base',
			fontFamily: 'heading',
			fontWeight: 'heading',
			lineHeight: 'heading',
			letterSpacing: 'heading',
		}),
	],
	variants: {
		level: {
			1: sprinkles({ fontSize: 'xxxl' }),
			2: sprinkles({ fontSize: 'xxl' }),
			3: sprinkles({ fontSize: 'xl' }),
		},
	},
	defaultVariants: {
		level: 1,
	},
});

export type HeadingVariants = RecipeVariants<typeof heading>;
