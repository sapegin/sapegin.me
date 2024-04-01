import { textContent } from '../../styled-system/patterns/text-content';
import { createBox, type BoxProps } from './Box';

/**
 * Container for user generated content with styles for all common HTML elements.
 */
export function TextContent(props: BoxProps<'div'>) {
	return createBox({ ...props, className: textContent() });
}
