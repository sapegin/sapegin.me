import { Fragment } from 'react';
import { Box, Grid, Text, Link } from '.';
import { menu, HALF } from './Menu.css';

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
		title: 'Blog',
		href: '/blog/',
	},
	{
		// TODO: Today I learned tooltip / aria-label
		title: 'TIL',
		href: '/til/',
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

export function Menu({ current }: Props) {
	return (
		<Grid
			as="ul"
			columnGap="m"
			rowGap={{ mobile: 0, tablet: 'm' }}
			justifyItems="center"
			className={menu}
		>
			{ITEMS.map(({ title, href }, index) => (
				<Fragment key={href}>
					{index === HALF && (
						<Box
							as="li"
							aria-hidden="true"
							display={{ mobile: 'none', tablet: 'block' }}
						/>
					)}
					<Text
						as="li"
						variant="menu"
						fontWeight={href === current ? 'bold' : undefined}
					>
						<Link href={href}>{title}</Link>
					</Text>
				</Fragment>
			))}
		</Grid>
	);
}
