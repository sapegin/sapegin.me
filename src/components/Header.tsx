import { Box, Logo, Menu } from '.';
import { LOGO_WIDTH } from './Logo';

type Props = {
	url: string;
};

export function Header({ url }: Props) {
	return (
		<Box as="header">
			<Box
				width={{ tablet: LOGO_WIDTH }}
				mx="auto"
				mb={{ base: 'm', tablet: '-2.6rem' }}
				textAlign="center"
			>
				<Logo />
			</Box>
			<Menu current={url} />
		</Box>
	);
}
