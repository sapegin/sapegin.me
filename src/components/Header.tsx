import { Box, Logo, Menu } from '.';
import { logo } from './Header.css';

interface HeaderProps {
	url: string;
}

export function Header({ url }: HeaderProps) {
	return (
		<Box as="header">
			<Box mx="auto" textAlign="center" className={logo}>
				<Logo />
			</Box>
			<Menu current={url} />
		</Box>
	);
}
