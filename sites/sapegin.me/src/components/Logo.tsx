import { type ReactNode } from 'react';

export const LOGO_WIDTH = '400px';

const Span = ({ children }: { children: ReactNode }) => (
	<span
		className="bg-text font-ui text-ui text-background ease-hover group-hover:bg-accent inline-block px-2 pt-0.5 leading-[0.8] tracking-[0.05ex] uppercase no-underline transition-all duration-(--duration-hover)"
	>
		{children}
	</span>
);

export function Logo() {
	return (
		<a href="/" className="group link inline-flex flex-col">
			<span>
				<Span>Artem</Span>
			</span>
			<span>
				<Span>Sapegin</Span>
			</span>
		</a>
	);
}
