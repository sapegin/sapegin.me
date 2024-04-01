import { createElement, type ElementType } from 'react';
// @ts-expect-error: Doesn't come with types
import { splitProps } from '../../styled-system/helpers';
import { styled, type HTMLStyledProps } from '../../styled-system/jsx';
import { visuallyHidden } from '../../styled-system/patterns/visually-hidden';
import type { AsProp } from './Box';

export type VisuallyHiddenProps<C extends ElementType> = HTMLStyledProps<C> &
	AsProp<C>;

export function VisuallyHidden<C extends ElementType>({
	as,
	...props
}: VisuallyHiddenProps<C>) {
	const [patternProps, restProps] = splitProps(props, []);

	const styleProps = visuallyHidden.raw(patternProps);
	const mergedProps = { ...styleProps, ...restProps };

	return createElement(styled(as ?? 'div'), mergedProps);
}
