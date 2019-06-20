import React from 'react';
import styled from '@emotion/styled';
import { Box, Row, Column, Link, Text } from 'tamia';
import { Book } from '../types';

type Props = {
	items: Book[];
};

const Cover = styled.img`
	max-width: 100%;
	height: auto;
`;

export default function Books({ items }: Props) {
	return (
		<Row as="ul">
			{items.map(item => (
				<Column as="li" key={item.link} width={[1, 1 / 2]}>
					<Box mb="l">
						<Row narrow>
							<Column width={[1 / 3]} aria-hidden="true">
								<Link href={item.link}>
									<Cover src={`/images/${item.cover}`} alt="" />
								</Link>
							</Column>
							<Column width={[2 / 3]}>
								<Text as={Link} href={item.link} size="l">
									{item.title}
								</Text>
								<Text size="m">{item.description}</Text>
							</Column>
						</Row>
					</Box>
				</Column>
			))}
		</Row>
	);
}
