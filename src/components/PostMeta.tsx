import { Link } from './Link';
import { InlineList, InlineListItem } from './InlineList';
import { Nobr } from './Nobr';
import { FormattedDate } from './FormattedDate';
import type { Post } from '../types/Post';
import { ME_BLUESKY_URL, ME_GITHUB_URL, ME_MASTODON_URL } from '../constants';

// TODO: Special case for the book?
const getGitHubLink = (url: string) => {
	const filename = `${url.slice(0, -1)}.md`;
	return `${ME_GITHUB_URL}/sapegin.me/edit/master/src/content/${filename}`;
};

type Props = Pick<Post, 'url' | 'date'>;

export function PostMeta({ url, date }: Props) {
	return (
		<InlineList>
			<InlineListItem variant="small">
				Discuss on <Link href={ME_MASTODON_URL}>Mastodon</Link> or{' '}
				<Link href={ME_BLUESKY_URL}>Bluesky</Link>
			</InlineListItem>
			<InlineListItem variant="small">
				<Link href={getGitHubLink(url)}>Edit on GitHub</Link>
			</InlineListItem>
			<InlineListItem variant="small">
				<time dateTime={date.toISOString()}>
					Published{' '}
					<Nobr>
						on <FormattedDate date={date} />
					</Nobr>
				</time>
			</InlineListItem>
		</InlineList>
	);
}
