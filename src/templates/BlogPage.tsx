import { Stack, Heading, PostList } from '../components';
import type { Post } from '../types/Post';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
	years: string[];
	postsByYear: Record<string, Post[]>;
};

export function BlogPage({ url, title, years, postsByYear }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				{years.map((year) => (
					<Stack key={year} as="section" gap="m">
						<Heading as="h2" level={2}>
							{year}
						</Heading>
						<PostList posts={postsByYear[year]} />
					</Stack>
				))}
			</Stack>
		</PageWithTitle>
	);
}
