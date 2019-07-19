import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import InlineListItem from './InlineListItem';

type Item = {
	title: string;
	link: string;
};

type Props = {
	items: Item[];
};

export default function InlineList({ items }: Props) {
	return (
		<Text as="ul" variant="small">
			{items.map(item => (
				<InlineListItem as="li" key={item.link}>
					<Link href={item.link}>{item.title}</Link>
				</InlineListItem>
			))}
		</Text>
	);
}
