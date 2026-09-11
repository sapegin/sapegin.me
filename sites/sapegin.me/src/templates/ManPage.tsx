import { type ReactNode } from 'react';
import { Page } from './Page';

interface Props {
	url: string;
	children?: ReactNode;
}

export function ManPage({ url, children }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-8">
				<h1 className="heading-1">Artem’s personal user manual</h1>
				<div className="prose">
					<div className="post-content">{children}</div>
				</div>
			</div>
		</Page>
	);
}
