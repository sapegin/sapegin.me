import { Link, InlineList, InlineListItem, Nobr, FormattedDate } from '.';
import type { Post } from '../types/Post';

const getMastodonLink = () => {
	return `https://mastodon.cloud/@sapegin`;
};

const getTwitterLink = () => {
	return `https://twitter.com/iamsapegin`;
};

// TODO: Special case for the book?
const getGitHubLink = (url: string) => {
	const filename = `${url.slice(0, -1)}.md`;
	return url.startsWith('/til/')
		? `https://github.com/sapegin/til/edit/master/${filename.replace(
				/^\/til\//,
				''
			)}`
		: `https://github.com/sapegin/sapegin.me/edit/master/src/content/${filename}`;
};

type Props = Pick<Post, 'url' | 'date'>;

// TODO: format date

export function PostMeta({ url, date }: Props) {
	return (
		<InlineList>
			<InlineListItem variant="small">
				Discuss on <Link href={getMastodonLink()}>Mastodon</Link> or{' '}
				<Link href={getTwitterLink()}>Twitter</Link>
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
