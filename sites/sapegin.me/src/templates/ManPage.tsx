import { type ReactNode } from 'react';
import { BlockProse } from '../components/BlockProse';
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
				<BlockProse intro>{children}</BlockProse>
			</div>
		</Page>
	);
}
