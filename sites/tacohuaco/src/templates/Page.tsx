import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export type PageProps = {
	children: ReactNode;
	extraFooter?: ReactNode;
	url: string;
};

export function Page({ children, extraFooter, url }: PageProps) {
	return (
		<div className="mx-auto max-w-[59rem] px-4">
			<div className="flex flex-col gap-16 min-h-screen py-8">
				<div className="flex flex-col gap-8">
					<Header url={url} />
					{children}
				</div>
				<Footer extraFooter={extraFooter} />
			</div>
		</div>
	);
}
