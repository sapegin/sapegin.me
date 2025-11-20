import { textContent } from '../../styled-system/patterns/text-content';
import { type BoxProps, createBox } from './Box';

/**
 * Container for user generated content with styles for all common HTML elements.
 */
export function TextContent(props: Omit<BoxProps<'div'>, 'className'>) {
	return createBox({ ...props, className: textContent() });
}
