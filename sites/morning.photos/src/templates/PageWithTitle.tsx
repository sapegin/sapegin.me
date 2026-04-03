import type { ReactNode } from 'react';
import { Box } from '../components/Box';
import { Heading } from '../components/Heading';
import { Stack } from '../components/Stack';
import { Page } from './Page';

type Props = {
	children: ReactNode;
	url: string;
	title: string;
};

export function PageWithTitle({ url, title, children }: Props) {
	return (
		<Page url={url}>
			<Stack gap="l">
				<Heading level={1} maxWidth="textMaxWidth">
					{title}
				</Heading>
				<Box>{children}</Box>
			</Stack>
		</Page>
	);
}
