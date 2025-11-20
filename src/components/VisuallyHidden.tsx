import { type ElementType } from 'react';
import { visuallyHidden } from '../../styled-system/patterns/visually-hidden';
import { type BoxProps, createBox } from './Box';

export type VisuallyHiddenProps<C extends ElementType> = Omit<
	BoxProps<C>,
	'className'
>;

export function VisuallyHidden<C extends ElementType = 'div'>(
	props: VisuallyHiddenProps<C>
) {
	return createBox({ ...props, className: visuallyHidden() });
}
