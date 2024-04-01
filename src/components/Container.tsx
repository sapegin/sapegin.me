import type { PropsWithoutRef } from 'react';
import { Box, type BoxProps } from './Box';

// TODO: ???? Not sure we still need this concept

/**
 * Content container with max width (`--content-max-width`).
 */
export function Container(props: PropsWithoutRef<BoxProps<'div'>>) {
	return (
		<Box
			css={{
				maxWidth: 'var(--content-max-width, "100%")',
				marginInline: 'auto',
				paddingInline: 'var(--content-padding-x, 0)',
			}}
			{...props}
		/>
	);
}
