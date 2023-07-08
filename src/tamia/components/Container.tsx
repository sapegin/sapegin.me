import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';
import { container } from './Container.css';

/**
 * Content container with max width (`theme.page.contentMaxWidth`).
 */
export function Container<C extends ElementType>(props: BoxProps<C>) {
	return <Box className={container} {...props} />;
}
