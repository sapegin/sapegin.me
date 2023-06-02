import React from 'react';
import { Link } from 'tamia-gatsby-link';
import { Text, Stack } from 'tamia';

type Props = {
	current: string;
};

type Item = {
	title: string;
	href: string;
};

const ITEMS: Item[] = [
	{
		title: 'About',
		href: '/',
	},
	{
		title: 'Blog',
		href: 'https://blog.sapegin.me/',
	},
	{
		title: 'TIL',
		href: 'https://blog.sapegin.me/til/',
	},
	{
		title: 'Book',
		href: 'https://blog.sapegin.me/book/',
	},
	{
		title: 'Photography',
		href: 'https://morning.photos/',
	},
];

export default function Menu({ current }: Props) {
	return (
		<Stack as="ul" gap="m" direction={['column', 'row']}>
			{ITEMS.map(({ title, href }) => (
				<Text
					key={href}
					as="li"
					fontWeight={href === current ? 'bold' : undefined}
				>
					<Link href={href}>{title}</Link>
				</Text>
			))}
		</Stack>
	);
}
