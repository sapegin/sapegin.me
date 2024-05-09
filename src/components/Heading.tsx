import { type ElementType } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

const heading = cva({
	base: {
		color: 'text',
		fontFamily: 'heading',
		fontWeight: 'heading',
		lineHeight: 'heading',
		letterSpacing: 'heading',
	},
	variants: {
		level: {
			1: {
				fontSize: 'xxxl',
			},
			2: {
				fontSize: 'xxl',
			},
			3: {
				fontSize: 'xl',
			},
		},
	},
});

type HeadingProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	RecipeVariantProps<typeof heading>;

export function Heading<C extends ElementType = 'h1'>({
	level = 1,
	...props
}: HeadingProps<C>) {
	return createBox(
		{
			...props,
			className: heading({ level }),
		},
		level ? `h${level}` : 'h1'
	);
}
