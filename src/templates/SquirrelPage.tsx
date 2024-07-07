import type { ReactNode } from 'react';
import {
	BuyMeCoffee,
	Heading,
	MurderOfCrows,
	PostContent,
	Stack,
} from '../components';
import type { Post } from '../types/Post';
import { Page } from './Page';

type Props = Post & {
	children?: ReactNode;
	related: Post[];
};

// TODO: Add "Sqrl also available for..."

export function SquirrelPage({ url, title, children }: Props) {
	return (
		<Page url={url}>
			<Stack as="main" gap="xl">
				<Stack gap="l">
					<Heading level={1} maxWidth="textMaxWidth">
						{title}
					</Heading>
					<PostContent>{children}</PostContent>
				</Stack>
				<BuyMeCoffee />
				<MurderOfCrows />
			</Stack>
		</Page>
	);
}
