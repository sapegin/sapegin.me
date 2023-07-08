import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';

/**
 * Responsive Flexbox container, based on the `Box` component but has `display: flex` by default.
 */
export function Flex<C extends ElementType>(props: BoxProps<C>) {
	return <Box display="flex" {...props} />;
}
