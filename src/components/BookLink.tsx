import { BookCover, Box, QuotedLink, Stack, Text } from '.';
import type { Resource } from '../types/Resource';
import { campaigns } from '../campaigns';

function getCampaign(url: string) {
	if (url === '/book/') {
		return campaigns.washingCode.enabled ? campaigns.washingCode : undefined;
	}
}

type Props = {
	book: Resource;
};

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
