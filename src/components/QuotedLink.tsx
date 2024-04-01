import { createElement } from 'react';
import { splitProps } from '../../styled-system/helpers.mjs';
import { styled, type HTMLStyledProps } from '../../styled-system/jsx';
import { getQuotedLinkStyle } from '../../styled-system/patterns/quoted-link.mjs';

export type LinkProps = HTMLStyledProps<'a'>;

/**
 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
 */
export function QuotedLink(props: LinkProps) {
	const [patternProps, restProps] = splitProps(props, []);

	const styleProps = getQuotedLinkStyle(patternProps);
	const mergedProps = { ...styleProps, ...restProps };

	return createElement(styled.a, mergedProps);
}
