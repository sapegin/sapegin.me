import { Logo } from './Logo';
import { Menu } from './Menu';

interface Props {
	url: string;
}

export function Header({ url }: Props) {
	return (
		<header>
			<a
				href="#content"
				className="
      absolute -top-full bg-text p-4 text-background no-underline
      focus:top-0 focus:outline-0
    "
			>
				Skip to content
			</a>
			<div
				className="
      flex flex-col items-center justify-between gap-2
      md:flex-row
    "
			>
				<Logo />
				<Menu current={url} />
			</div>
		</header>
	);
}
