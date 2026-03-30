import type { Post } from '../types/Post';
import { PostList } from './PostList';

interface Props {
	posts: Post[];
}

export function RelatedPosts({ posts }: Props) {
	return (
		<nav
			className="flex flex-col gap-4"
			aria-labelledby="related-posts-heading"
		>
			<h2 className="heading-3" id="related-posts-heading">
				You may also like
			</h2>
			<PostList posts={posts} />
		</nav>
	);
}
