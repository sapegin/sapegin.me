import type { ElementType } from 'react';
import clsx from 'clsx';
import { Box, type BoxProps } from '../tamia/components/Box';
import { button, type ButtonVariants } from './Button.css';

export function Button<C extends ElementType = 'button'>({
	as,
	variant = 'medium',
	className,
	...props
}: BoxProps<C> & ButtonVariants) {
	return (
		<Box
			{...(props as BoxProps<C>)}
			as={as ?? 'button'}
			className={clsx(className, button({ variant }))}
		/>
	);
}
