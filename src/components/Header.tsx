import { Box } from './Box';
import { Logo, LOGO_WIDTH } from './Logo';
import { Menu } from './Menu';

type Props = {
	url: string;
};

export function Header({ url }: Props) {
	return (
		<Box
			as="header"
			css={{
				// @ts-expect-error: no types for Firefox property but it works
				MozOsxFontSmoothing: 'grayscale',
				WebkitFontSmoothing: 'antialiased',
			}}
		>
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
