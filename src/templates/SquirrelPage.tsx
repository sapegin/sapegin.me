import type { ReactNode } from 'react';
import Group from 'react-group';
import { BuyMeCoffee } from '../components/BuyMeCoffee';
import { Heading } from '../components/Heading';
import { InlineList, InlineListItem } from '../components/InlineList';
import { Link } from '../components/Link';
import { Text } from '../components/Text';
import { MurderOfCrows } from '../components/MurderOfCrows';
import { PostContent } from '../components/PostContent';
import { Stack } from '../components/Stack';
import { TextTypo } from '../components/TextTypo';
import type { Squirrel } from '../types/Squirrel';
import { Page } from './Page';

type Props = Squirrel & {
	children?: ReactNode;
	squirrels: Squirrel[];
};

function getGitHubLink(id: string) {
	return `https://github.com/sapegin/squirrelsong/edit/master/themes/${id}/Readme.md`;
}

function getSourceLink(id: string) {
	return `https://github.com/sapegin/squirrelsong/edit/master/themes/${id}/`;
}

function getIssueLink() {
	return `https://github.com/sapegin/squirrelsong/discussions`;
}

export function SquirrelPage({ url, title, id, squirrels, children }: Props) {
	return (
		<Page url={url}>
			<Stack gap="xl">
				<Stack gap="l">
					<Heading level={1} maxWidth="textMaxWidth">
						{title}
					</Heading>
					<PostContent>{children}</PostContent>
					<Stack gap="xs">
						<TextTypo>
							<Link href="/squirrelsong/">Squirrelsong themes</Link> are
							low-contrast color schemes with great readability for web
							developers and non-distracting UI themes for many apps. It’s also
							available for:
						</TextTypo>
						<Text>
							<Group separator=", ">
								{squirrels.map((squirrel) =>
									squirrel.id === id ? (
										squirrel.app
									) : (
										<Link key={squirrel.id} href={squirrel.url}>
											{squirrel.app}
										</Link>
									)
								)}
							</Group>
						</Text>
					</Stack>
					<nav aria-label="Page tools">
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
					</nav>
				</Stack>
				<BuyMeCoffee />
				<MurderOfCrows />
			</Stack>
		</Page>
	);
}
