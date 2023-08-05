import type { ElementType } from 'react';
import clsx from 'clsx';
import { splitAtoms } from '../tamia';
import { Box, type BoxProps } from '../tamia/components/Box';
import { text, type TextVariants } from './Text.css';
import { sprinkles, type Sprinkles } from '../styles/sprinkles.css';

export type TextProps<C extends ElementType> = BoxProps<C> &
	TextVariants &
	Sprinkles;

export function Text<C extends ElementType = 'p'>({
	as,
	variant = 'base',
	className,
	...props
}: TextProps<C>) {
	const { atomProps, otherProps } = splitAtoms(props, sprinkles);
	return (
		<Box
			{...(otherProps as TextProps<C>)}
			as={as ?? 'p'}
			className={clsx(className, sprinkles(atomProps), text({ variant }))}
		/>
	);
}
