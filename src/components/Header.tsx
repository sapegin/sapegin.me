import { Banner } from './Banner';
import { Logo } from './Logo';
import { Menu } from './Menu';

interface Props {
	url: string;
}

export function Header({ url }: Props) {
	return (
		<header className="antialiased">
			<a
				href="#content"
				className="
      absolute -top-full bg-text p-4 text-background no-underline
      focus:top-0 focus:outline-0
    "
			>
				Skip to content
			</a>
			<Banner />
			<div
				className="
      mx-auto mb-4 text-center
      md:-mb-[2.6rem] md:w-[400px]
    "
			>
				<Logo />
			</div>
			<Menu current={url} />
		</header>
	);
}
