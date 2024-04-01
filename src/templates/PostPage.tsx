import type { ReactNode } from 'react';
import {
	BookPostFooter,
	BookPostHeader,
	Heading,
	MurderOfCrows,
	PostContent,
	PostMeta,
	RelatedPosts,
	Stack,
	Subscription,
	Text,
} from '../components';
import type { Post } from '../types/Post';
import { Page } from './Page';

type Props = Post & {
	children?: ReactNode;
	related: Post[];
};

export function PostPage({
	url,
	title,
	date,
	source,
	children,
	related,
	draft,
}: Props) {
	return (
		<Page url={url}>
			<Stack as="main" gap="xl">
				<Stack gap="l">
					<Heading level={1} maxWidth="textMaxWidth">
						{title}
					</Heading>
					{draft && (
						<Text variant="bold">
							This is a draft post, please don’t share it until it’s published.
						</Text>
					)}
					{source && <BookPostHeader />}
					<PostContent>{children}</PostContent>
					{source && <BookPostFooter />}
					<footer>
						<PostMeta url={url} date={date} />
					</footer>
				</Stack>
				<MurderOfCrows />
				<Subscription />
				{related.length > 0 && (
					<aside aria-label="Related posts">
						<RelatedPosts posts={related} />
					</aside>
				)}
			</Stack>
		</Page>
	);
}
