import type { ReactNode } from 'react';
import { Box, Footer, Header, Stack } from '../components';

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
					{children}
				</Stack>
				<Footer />
			</Stack>
		</Box>
	);
}
