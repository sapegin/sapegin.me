import { Stack, Text, QuotedLink, BookCover } from '.';
import type { Resource } from '../types/Resource';

type Props = {
	book: Resource;
};

export function BookLink({ book: { url, image, title, description } }: Props) {
	return (
		<QuotedLink key={url} href={url} display="block">
			<Stack gap="m" direction="row">
				<BookCover book={image as any} />
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
