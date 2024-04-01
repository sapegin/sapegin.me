import { createElement } from 'react';
import { splitProps } from '../../styled-system/helpers.mjs';
import { styled, type HTMLStyledProps } from '../../styled-system/jsx';
import { getLinkStyle } from '../../styled-system/patterns/link.mjs';

export type LinkProps = HTMLStyledProps<'a'>;

/**
 * Text link.
 */
export function Link(props: LinkProps) {
	const [patternProps, restProps] = splitProps(props, []);

	const styleProps = getLinkStyle(patternProps);
	const mergedProps = { ...styleProps, ...restProps };

	return createElement(styled.a, mergedProps);
}
