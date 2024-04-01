import { type ElementType } from 'react';
import {
	stack,
	type StackProperties,
} from '../../styled-system/patterns/stack';
import { createBox, type BoxProps } from './Box';

export type StackProps<C extends ElementType> = BoxProps<C> & StackProperties;

export function Stack<C extends ElementType>({
	direction,
	...props
}: StackProps<C>) {
	const styleProps = stack.raw({ direction });
	return createBox({ ...styleProps, ...props });
}
