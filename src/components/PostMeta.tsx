import { ME_BLUESKY_URL, ME_GITHUB_URL, ME_MASTODON_URL } from '../constants';
import type { Post } from '../types/Post';
import { FormattedDate } from './FormattedDate';
import { InlineList, InlineListItem } from './InlineList';

// TODO: Special case for the book?
const getGitHubLink = (url: string) => {
	const filename = `${url.slice(0, -1)}.md`;
	return `${ME_GITHUB_URL}/sapegin.me/edit/master/src/content/${filename}`;
};

type Props = Pick<Post, 'url' | 'date'>;

export function PostMeta({ url, date }: Props) {
	return (
		<nav aria-label="Page tools">
			<InlineList>
				<InlineListItem>
					Discuss on{' '}
					<a className="link" href={ME_MASTODON_URL}>
						Mastodon
					</a>{' '}
					or{' '}
					<a className="link" href={ME_BLUESKY_URL}>
						Bluesky
					</a>
				</InlineListItem>
				<InlineListItem>
					<a className="link" href={getGitHubLink(url)}>
						Edit on GitHub
					</a>
				</InlineListItem>
				<InlineListItem>
					<time dateTime={date.toISOString()}>
						Published{' '}
						<span className="text-nowrap">
							on <FormattedDate date={date} />
						</span>
					</time>
				</InlineListItem>
			</InlineList>
		</nav>
	);
}
