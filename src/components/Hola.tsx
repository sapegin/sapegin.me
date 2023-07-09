import type { ReactNode } from 'react';
import { Box, Stack, Heading, IconCoffee } from '.';
import { name } from './Hola.css';

type Props = {
	children: ReactNode;
};

export function Hola({ children }: Props) {
	return (
		<Heading level={1}>
			<Stack
				as="span"
				display="inline-flex"
				direction="row"
				gap="s"
				alignItems="center"
			>
				<span className={name}>{children}</span>
				<Box sx={{ marginTop: '-9px' }}>
					<IconCoffee />
				</Box>
			</Stack>
		</Heading>
	);
}
