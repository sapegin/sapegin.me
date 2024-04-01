import type { PropsWithoutRef } from 'react';
import { Box, type BoxProps } from './Box';

/**
 * Responsive photo with max height.
 */
export function Video(props: PropsWithoutRef<BoxProps<'iframe'>>) {
	return (
		<Box
			as="iframe"
			{...props}
			title="YouTube video player"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			css={{
				aspectRatio: '16 / 9',
				width: '100%',
				border: 0,
			}}
		/>
	);
}
