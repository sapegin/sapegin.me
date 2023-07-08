import clsx from 'clsx';
import { Box, type BoxProps } from '../tamia/components/Box';
import { heading, type HeadingVariants } from './Heading.css';
import type { ElementType } from 'react';

export function Heading<C extends ElementType>({
	level = 1,
	as,
	className,
	...props
}: BoxProps<C> & HeadingVariants) {
	return (
		<Box
			as={(as as any) ?? `h${level}`}
			className={clsx(className, heading({ level }))}
			{...props}
		/>
	);
}
