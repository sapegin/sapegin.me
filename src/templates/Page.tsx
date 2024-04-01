import type { ReactNode } from 'react';
import { Container, Header, Footer } from '../components';
import { Stack } from '../components/Stack';

type Props = {
	children: ReactNode;
	url: string;
};

export function Page({ children, url }: Props) {
	return (
		<Container py="m">
			<Stack gap="xl">
				<Stack gap="l">
					<Header url={url} />
					{children}
				</Stack>
				<Footer />
			</Stack>
		</Container>
	);
}
