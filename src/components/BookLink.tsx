import { BookCover, Box, QuotedLink, Stack, Text } from '.';
import type { Resource } from '../types/Resource';

type Props = {
	book: Resource;
};

export function BookLink({ book: { url, image, title, description } }: Props) {
	return (
		<QuotedLink key={url} href={url} display="block">
			<Stack gap="m" direction="row">
				{image && (
					<Box flexShrink={0}>
						<BookCover image={image} title={title} />
					</Box>
				)}
				<Stack direction="column" gap="s">
					<Text as="u" variant="large">
						{title}
					</Text>
					<Text>{description}</Text>
				</Stack>
			</Stack>
		</QuotedLink>
	);
}
