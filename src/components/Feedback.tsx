import type { ReactNode } from 'react';
import {
	ME_BLUESKY_HANDLE,
	ME_BLUESKY_URL,
	ME_GITHUB_URL,
	ME_MASTODON_HANDLE,
	ME_MASTODON_URL,
} from '../constants';

interface Props {
	children?: ReactNode;
	github: string;
}

export function Feedback({ children = <>Write me at</>, github }: Props) {
	return (
		<p className="typo-intro">
			{children}{' '}
			<a className="link" href="mailto:artem@sapegin.me">
				artem@sapegin.me
			</a>
			,{' '}
			<a className="link" href={ME_MASTODON_URL} rel="me">
				{ME_MASTODON_HANDLE}
			</a>
			,{' '}
			<a className="link" href={ME_BLUESKY_URL}>
				{ME_BLUESKY_HANDLE}
			</a>
			, or{' '}
			<a className="link" href={`${ME_GITHUB_URL}/${github}/issues`}>
				open an issue
			</a>
			.
		</p>
	);
}
