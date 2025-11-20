import { type ElementType } from 'react';
import { flex } from '../../styled-system/patterns/flex';
import { type BoxProps, createBox } from './Box';

export type FlexProps<C extends ElementType> = Omit<BoxProps<C>, 'className'>;

export function Flex<C extends ElementType>(props: FlexProps<C>) {
	return createBox({ ...props, className: flex() });
}
