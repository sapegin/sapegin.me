import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from '../styles/sprinkles.css';
import { colors } from '../styles/theme.css';
import { getPixelBorder } from '../util/getPixelBorder';

export const button = recipe({
	base: [
		sprinkles({
			display: 'inline-block',
			px: { mobile: 'm', tablet: 'l' },
			fontFamily: 'ui',
			borderColor: 'base',
			backgroundColor: 'bg',
			color: { default: 'base', hover: 'hover', focus: 'hover' },
		}),
		{
			borderStyle: 'solid',
			borderWidth: 4,
			borderImageSlice: 4,
			borderImageWidth: 1,
			borderImageOutset: 0,
			borderImageSource: getPixelBorder(colors.base),
			lineHeight: '1rem',
			textDecoration: 'none',
			userSelect: 'none',
			outline: 0,
			':hover': {
				cursor: 'pointer',
				borderImageSource: getPixelBorder(colors.hover),
			},
			':active': {
				cursor: 'pointer',
				transform: 'translateY(1px)',
			},
			':focus': {
				borderImageSource: getPixelBorder(colors.hover),
			},
			selectors: {
				'&::-moz-focus-inner': {
					border: 0,
				},
			},
		},
	],
	variants: {
		variant: {
			medium: [
				sprinkles({
					py: 's',
					fontSize: 'ui',
				}),
				{ height: '2.2rem' },
			],
			large: sprinkles({
				py: 'm',
				fontSize: 'xl',
			}),
		},
	},
	defaultVariants: {
		variant: 'medium',
	},
});

export type ButtonVariants = RecipeVariants<typeof button>;
