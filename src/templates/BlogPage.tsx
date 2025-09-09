import { Stack } from '../components/Stack';
import { Heading } from '../components/Heading';
import { PostList } from '../components/PostList';
import type { Post } from '../types/Post';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
	years: string[];
	postsByYear: Record<string, Post[]>;
};

function getStartIndex(
	years: string[],
	postsByYear: Record<string, Post[]>,
	year: string
) {
	let yearStartIndex = -1;
	for (let i = years.indexOf(year); i < years.length; i++) {
		yearStartIndex += postsByYear[years[i]].length;
	}
	return yearStartIndex;
}

export function BlogPage({ url, title, years, postsByYear }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				{years.map((year) => {
					const yearStartIndex = getStartIndex(years, postsByYear, year);
					return (
						<Stack key={year} as="section" gap="m">
							<Heading as="h2" level={2}>
								{year}
							</Heading>
							<PostList posts={postsByYear[year]} startIndex={yearStartIndex} />
						</Stack>
					);
				})}
			</Stack>
		</PageWithTitle>
	);
}
