import React from 'react';
import styled from 'react-emotion';
import { Box, Row, Column, Link } from 'tamia';

const TitleLink = styled(Link)`
	font-size: ${props => props.theme.fontSizes[props.primary ? 'xl' : 'l']};
`;

const Description = styled.p`
	font-size: ${props => props.theme.fontSizes[props.primary ? 'l' : 'm']};
`;

const ColumnList = ({ items, primary }) => (
	<Row>
		{items.map(item => (
			<Column key={item.link} width={[1, 1 / 2]}>
				<Box mb="s">
					<TitleLink primary={primary} href={item.link}>
						{item.title}
					</TitleLink>
					<Description primary={primary}>{item.description}</Description>
				</Box>
			</Column>
		))}
	</Row>
);

export default ColumnList;
