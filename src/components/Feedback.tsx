import type { ReactNode } from 'react';
import { Text } from './Text';
import { Link } from './Link';
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
		<Text variant="intro">
			{children} <Link href="mailto:artem@sapegin.me">artem@sapegin.me</Link>,{' '}
			<Link href={ME_MASTODON_URL} rel="me">
				{ME_MASTODON_HANDLE}
			</Link>
			, <Link href={ME_BLUESKY_URL}>{ME_BLUESKY_HANDLE}</Link>, or{' '}
			<Link href={`${ME_GITHUB_URL}/${github}/issues`}>open an issue</Link>.
		</Text>
	);
}
