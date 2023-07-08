import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';
import { textContent } from './TextContent.css';

// Inspired by Bootstrap and Typography.js

/**
 * Container for user generated content with styles for all common HTML elements.
 */
export function TextContent<C extends ElementType>(props: BoxProps<C>) {
	return <Box className={textContent} {...props} />;
}
