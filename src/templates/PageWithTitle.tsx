import type { ReactNode } from 'react';
import { Box, Heading, Stack } from '../components';
import { Page } from './Page';

type Props = {
	children: ReactNode;
	url: string;
	title: string;
};

export function PageWithTitle({ url, title, children }: Props) {
	return (
		<Page url={url}>
			<Stack gap="xl">
				<Stack as="main" gap="l">
					<Heading level={1} maxWidth="textMaxWidth">
						{title}
					</Heading>
					<Box>{children}</Box>
				</Stack>
			</Stack>
		</Page>
	);
}
