import { Box, Logo, Menu } from '.';
import { LOGO_WIDTH } from './Logo';

type Props = {
	url: string;
};

export function Header({ url }: Props) {
	return (
		<Box as="header">
			<Box
				mx="auto"
				textAlign="center"
				css={{
					marginBottom: { base: 'm', tablet: '-2.6rem' },
					width: { tablet: LOGO_WIDTH },
				}}
			>
				<Logo />
			</Box>
			<Menu current={url} />
		</Box>
	);
}
