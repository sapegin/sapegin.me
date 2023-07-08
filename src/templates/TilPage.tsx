import { Stack, Heading, PostList } from '../components';
import { upperFirst } from 'lodash';
import type { Post } from '../types/Post';
import { PageWithTitle } from './PageWithTitle';

const CATEGORY_TITLES: Record<string, string> = {
	javascript: 'JavaScript',
	typescript: 'TypeScript',
};

const getCategoryTitle = (key: string) => {
	return CATEGORY_TITLES[key] ?? upperFirst(key);
};

type Props = {
	url: string;
	title: string;
	categories: string[];
	postsByCategory: Record<string, Post[]>;
};

export function TilPage({ url, title, categories, postsByCategory }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				{categories.map((category) => (
					<Stack key={category} as="section" gap="m">
						<Heading as="h2" level={2}>
							{getCategoryTitle(category)}
						</Heading>
						<PostList posts={postsByCategory[category]} />
					</Stack>
				))}
			</Stack>
		</PageWithTitle>
	);
}
