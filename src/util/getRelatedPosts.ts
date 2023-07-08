import { sortBy } from 'lodash';
import type { Post } from '../types/Post';

const MAX_RELATED = 5;

export function getRelatedPosts(posts: Post[], { url, tags }: Post): Post[] {
	const weighted = posts
		.filter((post) => post.url !== url)
		.map((post) => {
			const common = post.tags.filter((tag) => tags.includes(tag));
			return {
				...post,
				weight: common.length * post.date.getTime(),
			};
		})
		.filter((post) => post.weight > 0);
	const sorted = sortBy(weighted, 'weight').reverse();
	return sorted.slice(0, MAX_RELATED);
}
