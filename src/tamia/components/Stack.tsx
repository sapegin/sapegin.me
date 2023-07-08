import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';

type Props = {
	direction?: BoxProps<'div'>['flexDirection'];
};

/**
 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
 * of spacing between children.
 */
export function Stack<C extends ElementType>({
	as,
	direction = 'column',
	...props
}: BoxProps<C> & Props) {
	return (
		<Box
			as={(as as any) ?? 'div'}
			display="flex"
			flexDirection={direction}
			{...props}
		/>
	);
}
