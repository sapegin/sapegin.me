import { Fragment } from 'react';
import { Box, Grid, Link, Text } from '.';

// Half of total menu items
export const HALF = 3;

type Props = {
	current: string;
};

interface Item {
	title: string;
	href: string;
	alt?: string;
}

const ITEMS: Item[] = [
	{
		title: 'About',
		href: '/',
	},
	{
		title: 'Blog',
		href: '/blog/',
	},
	{
		title: 'TIL',
		href: '/til/',
		alt: 'Today I learned',
	},
	{
		title: 'Book',
		href: '/book/',
	},
	{
		title: 'Sqrlsng',
		href: '/squirrelsong/',
		alt: 'Squirrelsong',
	},
	{
		title: 'Photos',
		href: '/photos/',
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
		<Grid
			as="ul"
			columnGap="m"
			rowGap={{ tablet: 'm' }}
			justifyItems="center"
			css={{
				gridTemplateColumns: {
					base: `repeat(${HALF}, 1fr)`,
					tablet: `repeat(${HALF}, min-content) auto repeat(${HALF}, min-content)`,
				},
			}}
		>
			{ITEMS.map(({ title, href, alt }, index) => (
				<Fragment key={href}>
					{index === HALF && (
						<Box
							as="li"
							aria-hidden="true"
							display={{ base: 'none', tablet: 'block' }}
						/>
					)}
					<Text as="li" variant="menu">
						<Link
							href={href}
							css={{
								textShadow: isCurrent(href, current)
									? `2px 2px color-mix(in hsl, token(colors.primary), transparent 60%)`
									: undefined,
								// HACK: Increase specificity to override Link styles (Astro production
								// build imports CSS in a different order)
								'&&': {
									textDecoration: 'none',
								},
							}}
							title={alt}
							aria-label={alt}
						>
							{title}
						</Link>
					</Text>
				</Fragment>
			))}
		</Grid>
	);
}
