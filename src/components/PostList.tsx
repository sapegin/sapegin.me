import { Box, Stack, Text, Link, FormattedDate, InlineSeparator } from '.';
import type { Resource } from '../types/Resource';

type Props = {
	posts: Resource[];
	showDescriptions?: boolean;
	showDates?: boolean;
};

export function PostList({
	posts,
	showDescriptions = false,
	showDates = false,
}: Props) {
	return (
		<Stack as="ul" direction="column" gap="s">
			{posts.map((post) => (
				<Text key={post.url ?? post.title} as="li">
					<Stack as="span" direction="row" gap="s" alignItems="center">
						{post.url ? <Link href={post.url}>{post.title}</Link> : post.title}
						{showDescriptions && post.description && (
							<Text variant="small">{post.description}</Text>
						)}
						{showDates && post.date && (
							<>
								<InlineSeparator />
								<Text
									as="time"
									variant="small"
									dateTime={post.date.toISOString()}
								>
									<FormattedDate date={post.date} />
								</Text>
							</>
						)}
					</Stack>
				</Text>
			))}
		</Stack>
	);
}
