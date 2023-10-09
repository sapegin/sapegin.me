import type { ReactNode } from 'react';
import {
	Stack,
	Heading,
	PostContent,
	PostMeta,
	Subscription,
	RelatedPosts,
	MurderOfCrows,
	BookPostHeader,
	BookPostFooter,
} from '../components';
import { Page } from './Page';
import type { Post } from '../types/Post';

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
}: Props) {
	return (
		<Page url={url}>
			<Stack as="main" gap="xl">
				<Stack gap="l">
					<Heading level={1}>{title}</Heading>
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
