import { Stack, Text, QuotedLink, BookCover } from '.';
import type { Resource } from '../types/Resource';

type Props = {
	book: Resource;
};

export function BookLink({ book: { url, image, title, description } }: Props) {
	return (
		<QuotedLink key={url} href={url} display="block">
			<Stack gap="m" direction="row">
				{image && <BookCover image={image} title={title} />}
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
