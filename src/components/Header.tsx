import { Box, Logo, Menu } from '.';
import { logo } from './Header.css';

type Props = {
	url: string;
};

export function Header({ url }: Props) {
	return (
		<Box as="header">
			<Box mx="auto" textAlign="center" className={logo}>
				<Logo />
			</Box>
			<Menu current={url} />
		</Box>
	);
}
