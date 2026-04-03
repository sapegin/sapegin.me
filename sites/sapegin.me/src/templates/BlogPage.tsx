import { PostList } from '../components/PostList';
import type { Post } from '../types/Post';
import { PageWithTitle } from './PageWithTitle';

interface Props {
	url: string;
	title: string;
	years: string[];
	postsByYear: Record<string, Post[]>;
}

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
			<div className="flex flex-col gap-8">
				{years.map((year) => {
					const yearStartIndex = getStartIndex(years, postsByYear, year);
					return (
						<section key={year} className="flex flex-col gap-4">
							<h2 className="heading-2">{year}</h2>
							<PostList posts={postsByYear[year]} startIndex={yearStartIndex} />
						</section>
					);
				})}
			</div>
		</PageWithTitle>
	);
}
