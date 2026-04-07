import type { ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

interface Props {
	children: ReactNode;
	url: string;
}

export function Page({ children, url }: Props) {
	return (
		<div className="mx-auto max-w-208 p-4">
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-8">
					<Header url={url} />
					<main className="flex flex-col gap-8" id="content">
						{children}
					</main>
				</div>
				<Footer />
			</div>
		</div>
	);
}
