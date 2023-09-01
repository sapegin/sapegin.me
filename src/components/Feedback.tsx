import type { ReactNode } from 'react';
import { Text, Link } from '.';

type Props = {
	children?: ReactNode;
	github: string;
};

export function Feedback({ children = <>Drop me a line at</>, github }: Props) {
	return (
		<Text variant="intro">
			{children} <Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>,{' '}
			<Link href="https://mastodon.cloud/@sapegin" rel="me">
				@sapegin@mastodon.cloud
			</Link>
			, <Link href="https://twitter.com/iamsapegin">@iamsapegin</Link>, or{' '}
			<Link href={`https://github.com/sapegin/${github}/issues`}>
				open an issue
			</Link>
			.
		</Text>
	);
}
