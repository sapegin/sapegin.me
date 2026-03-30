export const LOGO_WIDTH = '400px';

const Span = ({ children }: { children: React.ReactNode }) => (
	<span
		className="
    inline-block bg-text px-2 pt-0.5 font-ui text-ui leading-[0.8]
    tracking-[0.05ex] text-background uppercase no-underline transition-all
    duration-(--duration-hover) ease-hover
    group-hover:bg-accent
  "
	>
		{children}
	</span>
);

export function Logo() {
	return (
		<a href="/" className="group inline-flex link flex-col">
			<span>
				<Span>Artem</Span>
			</span>
			<span>
				<Span>Sapegin</Span>
			</span>
		</a>
	);
}
