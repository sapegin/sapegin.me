import type { ReactNode } from 'react';
import { BookPostFooter } from '../components/BookPostFooter';
import { BookPostHeader } from '../components/BookPostHeader';
import { MurderOfCrows } from '../components/MurderOfCrows';
import { PostMeta } from '../components/PostMeta';
import { RelatedPosts } from '../components/RelatedPosts';
import { Subscription } from '../components/Subscription';
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
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-8">
					<h1 className="max-w-text-max-width heading-1">{title}</h1>
					{draft && (
						<p className="typo-body font-bold">
							This is a draft post, please don’t share it until it’s published.
						</p>
					)}
					{source && <BookPostHeader />}
					<div className="post-content prose">{children}</div>
					{source && <BookPostFooter />}
					<footer>
						<PostMeta url={url} date={date} />
					</footer>
				</div>
				<MurderOfCrows />
				<Subscription />
				{related.length > 0 && <RelatedPosts posts={related} />}
			</div>
		</Page>
	);
}
