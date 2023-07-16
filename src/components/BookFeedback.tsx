import type { ReactNode } from 'react';
import { Text, Link } from '.';

type Props = {
	children: ReactNode;
};

export function BookFeedback({ children }: Props) {
	return (
		<Text variant="intro">
			{children} write me at{' '}
			<Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>,{' '}
			<Link href="https://mastodon.cloud/@sapegin" rel="me">
				@sapegin@mastodon.cloud
			</Link>
			, <Link href="https://twitter.com/iamsapegin">@iamsapegin</Link>, or{' '}
			<Link href="https://github.com/sapegin/washingcode-book/issues">
				open an issue
			</Link>
			.
		</Text>
	);
}
