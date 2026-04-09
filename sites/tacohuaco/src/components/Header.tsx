import { Logo } from './Logo';
import { Menu } from './Menu';

interface Props {
	url: string;
}

export function Header({ url }: Props) {
	return (
		<header className="
    flex flex-col justify-between gap-8
    lg:flex-row
  ">
			<Logo />
			<Menu current={url} />
		</header>
	);
}
