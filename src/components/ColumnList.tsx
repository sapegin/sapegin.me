import React from 'react';
import { Stack, Link, Text, Heading } from 'tamia';
import { Resource } from '../types';

type Props = {
	items: Resource[];
	primary?: boolean;
};

const LinkHeading = Heading.withComponent(Link);

const getVariantProps = (primary: boolean) =>
	primary
		? ({
				headingLevel: 2,
				descriptionVariant: 'large',
				gap: 's',
		  } as const)
		: ({
				headingLevel: 3,
				descriptionVariant: 'base',
				gap: 'xs',
		  } as const);

export default function ColumnList({ items, primary = false }: Props) {
	const { headingLevel, descriptionVariant, gap } = getVariantProps(primary);
	return (
		<Stack as="ul" gridColumnGap="l" gridRowGap="m" minColumnWidth={300}>
			{items.map(item => (
				<Stack key={item.link} as="li" gridGap={gap} alignContent="start">
					<LinkHeading href={item.link} level={headingLevel}>
						{item.title}
					</LinkHeading>
					<Text variant={descriptionVariant}>{item.description}</Text>
				</Stack>
			))}
		</Stack>
	);
}
