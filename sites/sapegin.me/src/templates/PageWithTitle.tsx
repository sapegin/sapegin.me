import type { ReactNode } from 'react';
import { Page } from './Page';

interface Props {
	children: ReactNode;
	url: string;
	title: string;
}

export function PageWithTitle({ url, title, children }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-8">
				<h1 className="max-w-text-max-width heading-1">{title}</h1>
				<div>{children}</div>
			</div>
		</Page>
	);
}
