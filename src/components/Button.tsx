import { type ElementType } from 'react';
import { type RecipeVariantProps } from '../../styled-system/css';
import { button } from '../../styled-system/recipes';
import { createBox, type BoxProps } from './Box';

export type ButtonProps<C extends ElementType> = Omit<
	BoxProps<C>,
	'className'
> &
	RecipeVariantProps<typeof button>;

export function Button<C extends ElementType = 'button'>({
	variant = 'medium',
	...props
}: ButtonProps<C>) {
	return createBox(
		{
			...props,
			className: button({ variant }),
		},
		'button'
	);
}
