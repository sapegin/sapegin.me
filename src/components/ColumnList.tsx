import React from 'react';
import styled from '@emotion/styled';
import { Box, Row, Column, Link } from 'tamia';
import { Resource } from '../types';

type Props = {
	items: Resource[];
	primary?: boolean;
};

const TitleLink = styled(Link)<Partial<Props> & React.ComponentProps<Link>>`
	font-size: ${props => props.theme.fontSizes[props.primary ? 'xl' : 'l']};
`;

const Description = styled.p<Partial<Props>>`
	font-size: ${props => props.theme.fontSizes[props.primary ? 'l' : 'm']};
`;

const ColumnList = ({ items, primary }: Props) => (
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
