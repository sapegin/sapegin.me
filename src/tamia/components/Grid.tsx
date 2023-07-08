import type { ElementType } from 'react';
import clsx from 'clsx';
import { Box, type BoxProps } from './Box';
import { gridAutoNarrow, gridAutoWide } from './Grid.css';

type Props = {
	auto?: 'narrow' | 'wide';
};

const AUTO_STYLES = {
	narrow: gridAutoNarrow,
	wide: gridAutoWide,
};

/**
 * Generic CSS Grid layout component. Based on the `Box` component but with `display: grid` by default.
 */
export function Grid<C extends ElementType>({
	className,
	auto,
	...props
}: BoxProps<C> & Props) {
	return (
		<Box
			display="grid"
			{...(props as BoxProps<C>)}
			className={clsx(className, auto && AUTO_STYLES[auto])}
		/>
	);
}
