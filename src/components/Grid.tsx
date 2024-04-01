import { type ElementType } from 'react';
import { grid, type GridProperties } from '../../styled-system/patterns/grid';
import { createBox, type BoxProps } from './Box';

export type GridProps<C extends ElementType> = BoxProps<C> & GridProperties;

export function Grid<C extends ElementType>({ auto, ...props }: GridProps<C>) {
	const styleProps = grid.raw({ auto });
	return createBox({ ...styleProps, ...props });
}
