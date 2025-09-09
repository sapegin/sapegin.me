import { Stack } from './Stack';
import { Text } from './Text';
import { Link } from './Link';
import { FormattedDate } from './FormattedDate';
import { InlineSeparator } from './InlineSeparator';
import { Box } from './Box';
import type { Resource } from '../types/Resource';

type Props = {
	posts: Resource[];
	showDescriptions?: boolean;
	showDates?: boolean;
	startIndex?: number;
};

export function PostList({
	posts,
	showDescriptions = false,
	showDates = false,
	startIndex,
}: Props) {
	return (
		<Stack as="ul" direction="column" gap="s">
			{posts.map((post, index) => (
				<Text key={post.url ?? post.title} as="li">
					<Stack
						as="span"
						direction={{ base: 'column', tablet: 'row' }}
						columnGap="s"
						alignItems={{ tablet: 'center' }}
						flexWrap="wrap"
					>
						<span>
							{startIndex && (
								<Text as="span" variant="small">
									{startIndex - index}.{' '}
								</Text>
							)}
							{post.url ? (
								<Link href={post.url}>{post.title}</Link>
							) : (
								post.title
							)}
						</span>
						{showDescriptions && post.description && (
							<Text variant="small">{post.description}</Text>
						)}
						{showDates && post.date && (
							<>
								<Box as="span" display={{ base: 'none', tablet: 'flex' }}>
									<InlineSeparator />
								</Box>
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
