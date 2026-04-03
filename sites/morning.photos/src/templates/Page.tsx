import type { ReactNode } from 'react';
import { Box } from '../components/Box';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Stack } from '../components/Stack';

type Props = {
	children: ReactNode;
	url: string;
};

export function Page({ children, url }: Props) {
	return (
		<Box maxWidth="52rem" mx="auto" px="contentPaddingX" py="m">
			<Stack gap="xl">
				<Stack gap="l">
					<Header url={url} />
					<Stack as="main" gap="l" id="content">
						{children}
					</Stack>
				</Stack>
				<Footer />
			</Stack>
		</Box>
	);
}
