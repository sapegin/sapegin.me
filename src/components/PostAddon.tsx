import type { ReactNode } from 'react';
import { Box } from './Box';

interface Props {
	children: ReactNode;
}

export function PostAddon({ children }: Props) {
	return (
		<Box
			mx="-m"
			px="m"
			py="l"
			css={{
				borderColor: 'accent',
				borderStyle: `solid`,
				borderWidth: `2px 0`,
				background: 'linear-gradient(0deg, #57729030 0%, #c45a8d30 100%)',
			}}
		>
			{children}
		</Box>
	);
}
