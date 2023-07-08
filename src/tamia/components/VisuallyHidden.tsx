import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';
import { visuallyHidden } from './VisuallyHidden.css';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
export function VisuallyHidden<C extends ElementType = 'p'>({
	as,
	...props
}: BoxProps<C>) {
	return <Box as={(as as any) ?? 'p'} className={visuallyHidden} {...props} />;
}
