import { Box } from './Box';
import { Logo } from './Logo';
import { Menu } from './Menu';
import { Stack } from './Stack';

type Props = {
	url: string;
};

export function Header({ url }: Props) {
	return (
		<Box as="header">
			<Box
				as="a"
				href="#content"
				css={{
					position: 'absolute',
					top: '-100%',
					padding: 'm',
					backgroundColor: 'text',
					color: 'background',
					textDecoration: 'none',
					_focus: {
						top: 0,
						outline: 0,
					},
				}}
			>
				Skip to content
			</Box>
			<Stack
				direction={{ base: 'column', tablet: 'row' }}
				justifyContent="space-between"
				alignItems="center"
				gap="s"
			>
				<Logo />
				<Menu current={url} />
			</Stack>
		</Box>
	);
}
