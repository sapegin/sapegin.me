import type { ReactNode } from 'react';
import { Page, type PageProps } from './Page';

type Props = PageProps & {
	title: ReactNode;
};

export function PageWithTitle({ title, children, ...props }: Props) {
	return (
		<Page {...props}>
			<div className="flex flex-col gap-16">
				<main className="flex flex-col gap-8">
					<h1 className="heading-1">{title}</h1>
					<div>{children}</div>
				</main>
			</div>
		</Page>
	);
}
