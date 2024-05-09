import { type ElementType } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

const text = cva({
	base: {
		color: 'text',
	},
	variants: {
		variant: {
			body: {
				fontFamily: 'body',
				fontSize: 'm',
				fontWeight: 'normal',
				lineHeight: 'base',
				letterSpacing: 'base',
			},
			bold: {
				fontFamily: 'body',
				fontSize: 'm',
				fontWeight: 'bold',
				lineHeight: 'base',
				letterSpacing: 'base',
			},
			small: {
				fontFamily: 'body',
				fontSize: 's',
				fontWeight: 'normal',
				lineHeight: 'base',
				letterSpacing: 'base',
			},
			large: {
				fontFamily: 'body',
				fontSize: 'l',
				fontWeight: 'normal',
				lineHeight: 'heading',
				letterSpacing: 'base',
			},
			menu: {
				fontFamily: 'ui',
				fontSize: 'ui',
				fontWeight: 'normal',
				lineHeight: 'base',
				letterSpacing: 'menu',
				textTransform: 'uppercase',
			},
			intro: {
				fontFamily: 'body',
				fontSize: 'article',
				fontStyle: 'italic',
				fontWeight: 'normal',
				lineHeight: 'base',
				letterSpacing: 'base',
			},
		},
	},
});

export type TextProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	RecipeVariantProps<typeof text>;

export function Text<C extends ElementType = 'p'>({
	variant = 'body',
	...props
}: TextProps<C>) {
	return createBox(
		{
			...props,
			className: text({ variant }),
		},
		'p'
	);
}
