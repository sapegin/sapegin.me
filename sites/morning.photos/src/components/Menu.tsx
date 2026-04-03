import { Link } from './Link';
import { Text } from './Text';
import { Stack } from './Stack';

type Props = {
	current: string;
};

interface Item {
	title: string;
	href: string;
}

const ITEMS: Item[] = [
	{
		title: 'About',
		href: '/',
	},
	{
		title: 'Photos',
		href: '/photos/',
	},
	{
		title: 'Series',
		href: '/series/',
	},
	// {
	// 	title: 'Blog',
	// 	href: '/blog/',
	// },
	{
		title: 'Zine',
		href: '/zine/',
	},
];

function isCurrent(href: string, current: string) {
	if (href === '/') {
		return href === current;
	}

	return current.startsWith(href);
}

export function Menu({ current }: Props) {
	return (
		<nav aria-label="Main">
			<Stack
				as="ul"
				direction="row"
				columnGap="m"
				rowGap={{ tablet: 'm' }}
				flexWrap="wrap"
				justifyItems="center"
				justifyContent="center"
			>
				{ITEMS.map(({ title, href }) => (
					<Text key={href} as="li" variant="menu">
						<Link
							href={href}
							css={{
								whiteSpace: 'nowrap',
								// HACK: Increase specificity to override Link styles (Astro production
								// build imports CSS in a different order)
								'&&': {
									textDecoration: isCurrent(href, current)
										? 'underline'
										: 'none',
								},
								_hover: {
									textDecoration: 'underline',
								},
							}}
						>
							{title}
						</Link>
					</Text>
				))}
			</Stack>
		</nav>
	);
}
