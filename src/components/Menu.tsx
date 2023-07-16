import { Fragment } from 'react';
import clsx from 'clsx';
import { Box, Grid, Text, Link } from '.';
import { menu, link, active, HALF } from './Menu.css';

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
		title: 'Photos',
		href: 'https://morning.photos/',
	},
	{
		title: 'Leather',
		href: 'https://www.etsy.com/de-en/shop/KlatzLeatherGoods',
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
			rowGap={{ mobile: 0, tablet: 'm' }}
			justifyItems="center"
			className={menu}
		>
			{ITEMS.map(({ title, href, alt }, index) => (
				<Fragment key={href}>
					{index === HALF && (
						<Box
							as="li"
							aria-hidden="true"
							display={{ mobile: 'none', tablet: 'block' }}
						/>
					)}
					<Text as="li" variant="menu">
						<Link
							href={href}
							className={clsx(link, isCurrent(href, current) && active)}
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
