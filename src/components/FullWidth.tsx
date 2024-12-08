import type { ReactNode } from 'react';
import { Box } from './Box';

type Props = {
	children: ReactNode;
};

/**
 * Container that expands to 100% of page width
 */
export function FullWidth({ children }: Props) {
	return (
		<Box width="100vw" marginLeft="calc(50% - 50vw)">
			<Box maxWidth={1200} marginInline="auto">
				{children}
			</Box>
		</Box>
	);
}
