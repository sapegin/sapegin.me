import type { ReactNode } from 'react';
import { PageWithTitle } from './PageWithTitle';

interface Props {
	url: string;
	children: ReactNode;
}

export function AboutPage({ url, children }: Props) {
	return (
		<PageWithTitle
			url={url}
			title={
				<>
					About Tacohuaco <span aria-hidden="true">🌮</span>
				</>
			}
		>
			<div className="prose">{children}</div>
		</PageWithTitle>
	);
}
