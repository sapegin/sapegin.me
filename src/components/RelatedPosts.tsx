import { Heading } from './Heading';
import { PostList } from './PostList';
import { Stack } from './Stack';
import type { Post } from '../types/Post';

interface Props {
	posts: Post[];
}

export function RelatedPosts({ posts }: Props) {
	return (
		<Stack gap="m" as="nav" aria-labelledby="related-posts-heading">
			<Heading as="h2" level={3} id="related-posts-heading">
				You may also like
			</Heading>
			<PostList posts={posts} />
		</Stack>
	);
}
