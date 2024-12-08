import { Stack } from './Stack';
import { Text } from './Text';
import { Link } from './Link';
import { BookCover } from './BookCover';
import { PostAddon } from './PostAddon';
import { campaigns } from '../campaigns';

const { enabled: isCampaignEnabled, badge } = campaigns.washingCode;

export function BookPostHeader() {
	return (
		<PostAddon>
			<Stack direction="row" gap="m">
				<Stack gap="m">
					{isCampaignEnabled && <Text variant="flag">{badge}</Text>}
					<Text variant="intro">
						You’re reading an excerpt of my upcoming book on clean code for
						frontend developers, “Washing your code.”
					</Text>
					<Text>
						<Link href="/book/">Get the book now!</Link>
					</Text>
				</Stack>
				<Link href="/book/">
					<BookCover image="washing-your-code" title="Washing your code" />
				</Link>
			</Stack>
		</PostAddon>
	);
}
