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
				className="bg-text text-background absolute -top-full p-4 no-underline focus:top-0 focus:outline-0"
			>
				Skip to content
			</a>
			<Banner />
			<div
				className="mx-auto mb-4 text-center md:mb-[-2.6rem] md:w-100"
			>
				<Logo />
			</div>
			<Menu current={url} />
		</header>
	);
}
