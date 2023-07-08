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
			<Stack gap="xl">
				<Stack as="main" gap="m">
					<Stack gap="l">
						<Heading level={1}>{title}</Heading>
						<Stack gap="m">
							<PostContent>
								{source && (
									<>
										<BookPostHeader />
										<hr />
									</>
								)}
								{children}
								{source && (
									<>
										<hr />
										<BookPostFooter />
									</>
								)}
							</PostContent>
						</Stack>
					</Stack>
					<footer>
						<PostMeta url={url} date={date} />
					</footer>
					<MurderOfCrows />
				</Stack>
				<Stack gap="l">
					<aside aria-label="Newsletter">
						<Subscription />
					</aside>
					{related.length > 0 && (
						<aside aria-label="Related posts">
							<RelatedPosts posts={related} />
						</aside>
					)}
				</Stack>
			</Stack>
		</Page>
	);
}
