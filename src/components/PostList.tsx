import { Box, Stack, Text, Link, FormattedDate } from '.';
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
				<Box key={post.url ?? post.title} as="li">
					<Text>
						{post.url ? <Link href={post.url}>{post.title}</Link> : post.title}
						{showDescriptions && post.description && (
							<Text variant="small">{post.description}</Text>
						)}
						{showDates && post.date && (
							<Text
								as="time"
								variant="small"
								dateTime={post.date.toISOString()}
							>
								<Text as="span" px="xs" fontSize="xs">
									{' ■ '}
								</Text>
								<FormattedDate date={post.date} />
							</Text>
						)}
					</Text>
				</Box>
			))}
		</Stack>
	);
}
