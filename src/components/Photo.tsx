import type { PropsWithoutRef } from 'react';
import { Box, type BoxProps } from './Box';

/**
 * Responsive photo with max height.
 */
export function Photo(props: PropsWithoutRef<BoxProps<'img'>>) {
	return (
		<Box
			as="img"
			loading="lazy"
			css={{
				width: 'auto',
				height: 'auto',
				maxWidth: {
					base: `min(100%, 100vw)`,
					tablet: `min(100%, calc(100vw - token(space.m)))`,
				},
				maxHeight: {
					base: `min(900px, 100vh)`,
					tablet: `min(900px, calc(100vh - token(space.m)))`,
				},
			}}
			{...props}
		/>
	);
}
