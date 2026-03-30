import type { Resource } from '../types/Resource';
import { FormattedDate } from './FormattedDate';
import { InlineSeparator } from './InlineSeparator';

interface Props {
	posts: Resource[];
	showDescriptions?: boolean;
	showDates?: boolean;
	startIndex?: number;
}

export function PostList({
	posts,
	showDescriptions = false,
	showDates = false,
	startIndex,
}: Props) {
	return (
		<ul className="flex flex-col gap-2">
			{posts.map((post, index) => (
				<li key={post.url ?? post.title} className="typo-body">
					<span
						className="
        flex flex-col flex-wrap gap-x-2
        md:flex-row md:items-center
      "
					>
						<span>
							{startIndex !== undefined && (
								<span className="typo-small">{startIndex - index}. </span>
							)}
							{post.url ? (
								<a className="link" href={post.url}>
									{post.title}
								</a>
							) : (
								post.title
							)}
						</span>
						{showDescriptions && post.description && (
							<p className="typo-small">{post.description}</p>
						)}
						{showDates && post.date && (
							<>
								<span
									className="
           hidden
           md:flex
         "
								>
									<InlineSeparator />
								</span>
								<time className="typo-small" dateTime={post.date.toISOString()}>
									<FormattedDate date={post.date} />
								</time>
							</>
						)}
					</span>
				</li>
			))}
		</ul>
	);
}
