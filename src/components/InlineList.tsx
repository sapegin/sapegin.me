import React from 'react';
import styled from 'styled-components';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

type Item = {
	title: string;
	link: string;
};

type Props = {
	items: Item[];
};

const Item = styled.li`
	display: inline;
	& + &::before {
		content: ' ∙ ';
	}
`;

export default function InlineList({ items }: Props) {
	return (
		<Text as="ul" variant="small">
			{items.map(item => (
				<Item key={item.link}>
					<Link href={item.link}>{item.title}</Link>
				</Item>
			))}
		</Text>
	);
}
