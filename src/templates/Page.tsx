import type { ReactNode } from 'react';
import { Container, Stack, Header, Footer } from '../components';

type Props = {
	children: ReactNode;
	url: string;
};

export function Page({ children, url }: Props) {
	return (
		<Container py="m">
			<Stack gap="l">
				<Header url={url} />
				{children}
				<Footer />
			</Stack>
		</Container>
	);
}
