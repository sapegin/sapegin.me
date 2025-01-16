import type { ReactNode } from 'react';
import { BookPostFooter } from '../components/BookPostFooter';
import { BookPostHeader } from '../components/BookPostHeader';
import { Heading } from '../components/Heading';
import { MurderOfCrows } from '../components/MurderOfCrows';
import { PostContent } from '../components/PostContent';
import { PostMeta } from '../components/PostMeta';
import { RelatedPosts } from '../components/RelatedPosts';
import { Stack } from '../components/Stack';
import { Subscription } from '../components/Subscription';
import { Text } from '../components/Text';
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
			<Stack gap="xl">
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
				{related.length > 0 && <RelatedPosts posts={related} />}
			</Stack>
		</Page>
	);
}
