import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';

const List = styled.ul`
	font-size: ${themeGet('fontSizes.s')};
`;

const Item = styled.li`
	display: inline;
	& + &::before {
		content: ' ∙ ';
	}
`;

const InlineList = ({ items }) => (
	<List>
		{items.map(item => (
			<Item key={item.link}>
				<Link href={item.link}>{item.title}</Link>
			</Item>
		))}
	</List>
);

export default InlineList;
