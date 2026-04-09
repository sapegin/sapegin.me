import type { ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export interface PageProps {
	children: ReactNode;
	extraFooter?: ReactNode;
	url: string;
}

export function Page({ children, extraFooter, url }: PageProps) {
	return (
		<div className="mx-auto max-w-236 px-4">
			<div className="flex min-h-screen flex-col gap-16 py-8">
				<div className="flex flex-col gap-8">
					<Header url={url} />
					{children}
				</div>
				<Footer extraFooter={extraFooter} />
			</div>
		</div>
	);
}
