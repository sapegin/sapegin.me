import type { PropsWithoutRef } from 'react';
import { Box, type BoxProps } from './Box';

/**
 * Expands content horizontally to remove the paddings so it is rendered
 * from edge to edge on small screens.
 */
export function Expander(props: PropsWithoutRef<BoxProps<'div'>>) {
	return (
		<Box
			css={{
				marginInline: {
					base: 'calc(var(--content-padding-x, 0) * -1)',
					tablet: 0,
				},
			}}
			{...props}
		/>
	);
}
