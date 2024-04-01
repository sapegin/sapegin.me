import { type ElementType } from 'react';
import { createBox, type BoxProps } from './Box';

export type FlexProps<C extends ElementType> = BoxProps<C>;

export function Flex<C extends ElementType>(props: FlexProps<C>) {
	return createBox(props);
}
