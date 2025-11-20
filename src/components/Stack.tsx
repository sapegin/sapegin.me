import { type ElementType } from 'react';
import {
	stack,
	type StackProperties,
} from '../../styled-system/patterns/stack';
import { type BoxProps, createBox } from './Box';

export type StackProps<C extends ElementType> = Omit<BoxProps<C>, 'className'> &
	StackProperties;

export function Stack<C extends ElementType>({
	direction,
	...props
}: StackProps<C>) {
	return createBox({ ...props, className: stack({ direction }) });
}
