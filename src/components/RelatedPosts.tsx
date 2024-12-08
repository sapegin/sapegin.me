import { Heading } from './Heading';
import { PostList } from './PostList';
import { Stack } from './Stack';
import type { Post } from '../types/Post';

type Props = {
	posts: Post[];
};

export function RelatedPosts({ posts }: Props) {
	return (
		<Stack gap="m">
			<Heading as="h2" level={3}>
				You may also like
			</Heading>
			<PostList posts={posts} />
		</Stack>
	);
}
