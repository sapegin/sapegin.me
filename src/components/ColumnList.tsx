import React from 'react';
import { Grid, Stack, Link, Text, Heading } from 'tamia';
import { Resource } from '../types';

type Props = {
	items: Resource[];
};

export default function ColumnList({ items }: Props) {
	return (
		<Grid as="ul" gridColumnGap="l" gridRowGap="m" minColumnWidth={300}>
			{items.map((item) => (
				<Stack key={item.link} as="li" gap="xs">
					<Heading as="div" level={3}>
						<Link href={item.link}>{item.title}</Link>
					</Heading>
					<Text>{item.description}</Text>
				</Stack>
			))}
		</Grid>
	);
}
