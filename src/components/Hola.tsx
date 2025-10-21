import type { ReactNode } from 'react';
import { Box } from './Box';
import { Stack } from './Stack';
import { Heading } from './Heading';
import { IconCoffee } from './IconCoffee';

interface Props {
	children: ReactNode;
}

export function Hola({ children }: Props) {
	return (
		<Heading level={1}>
			<Stack
				as="span"
				display="inline-flex"
				direction="row"
				gap="s"
				alignItems="baseline"
			>
				<Box
					css={{
						fontSize: 'clamp(2.6rem, 7vw, 4rem)',
						background: `linear-gradient(token(colors.accent), token(colors.primary))`,
						backgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					{children}
				</Box>
				<Box>
					<IconCoffee mt={-6} />
				</Box>
			</Stack>
		</Heading>
	);
}
