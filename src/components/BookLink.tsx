import { campaigns } from '../campaigns';
import type { Resource } from '../types/Resource';
import { BookCover } from './BookCover';
import { Box } from './Box';
import { QuotedLink } from './QuotedLink';
import { Stack } from './Stack';
import { Text } from './Text';

function getCampaign(url: string) {
	if (url === '/book/') {
		return campaigns.washingCode.enabled ? campaigns.washingCode : undefined;
	}
}

interface Props {
	book: Resource;
}

export function BookLink({ book: { url, image, title, description } }: Props) {
	const campaign = url ? getCampaign(url) : undefined;
	return (
		<QuotedLink key={url} href={url} display="block">
			<Stack gap="m" direction="row">
				{image && (
					<Box flexShrink={0}>
						<BookCover image={image} title={title} />
					</Box>
				)}
				<Stack direction="column" gap="s">
					{campaign && <Text variant="flag">{campaign.badge}</Text>}
					<Text as="u" variant="large">
						{title}
					</Text>
					<Text>{description}</Text>
				</Stack>
			</Stack>
		</QuotedLink>
	);
}
