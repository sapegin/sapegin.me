import { Heading, PostList } from '.';
import type { Post } from '../types/Post';

type Props = {
	posts: Post[];
};

export function RelatedPosts({ posts }: Props) {
	return (
		<>
			<Heading as="h2" level={3} mb="m">
				You may also like
			</Heading>
			<PostList posts={posts} />
		</>
	);
}
