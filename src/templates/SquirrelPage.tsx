import type { ReactNode } from 'react';
import {
	BuyMeCoffee,
	Heading,
	InlineList,
	InlineListItem,
	Link,
	MurderOfCrows,
	PostContent,
	Stack,
} from '../components';
import type { Squirrel } from '../types/Squirrel';
import { Page } from './Page';

type Props = Squirrel & {
	children?: ReactNode;
};

// TODO: Add "Sqrlsng also available for..."
// TODO: Add a short description of what Sqrlsng is

function getGitHubLink(id: string) {
	return `https://github.com/sapegin/squirrelsong/edit/master/themes/${id}/Readme.md`;
}

function getSourceLink(id: string) {
	return `https://github.com/sapegin/squirrelsong/edit/master/themes/${id}/`;
}

function getIssueLink() {
	return `https://github.com/sapegin/squirrelsong/discussions`;
}

export function SquirrelPage({ url, title, id, children }: Props) {
	return (
		<Page url={url}>
			<Stack as="main" gap="xl">
				<Stack gap="l">
					<Heading level={1} maxWidth="textMaxWidth">
						{title}
					</Heading>
					<PostContent>{children}</PostContent>
					<InlineList>
						<InlineListItem variant="small">
							<Link href={getSourceLink(id)}>View source code</Link>
						</InlineListItem>
						<InlineListItem variant="small">
							<Link href={getIssueLink()}>Report an issue</Link>
						</InlineListItem>
						<InlineListItem variant="small">
							<Link href={getGitHubLink(id)}>Edit on GitHub</Link>
						</InlineListItem>
					</InlineList>
				</Stack>
				<BuyMeCoffee />
				<MurderOfCrows />
			</Stack>
		</Page>
	);
}
