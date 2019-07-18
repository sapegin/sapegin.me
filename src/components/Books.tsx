import React from 'react';
import { Box, Stack, Text, QuotedLink } from 'tamia';
import { Book } from '../types';

type Props = {
	items: Book[];
};

type CoverProps = React.ComponentProps<typeof Box> &
	React.ComponentProps<'img'>;

const Cover = (props: CoverProps) => (
	<Box as="img" maxWidth="100%" height="auto" boxShadow="cover" {...props} />
);

type StackLinkProps = React.ComponentProps<typeof Stack> &
	React.ComponentProps<typeof QuotedLink>;

const StackLink = (props: StackLinkProps) => (
	<Stack as={QuotedLink} {...props} />
);

export default function Books({ items }: Props) {
	return (
		<Stack as="ul" gridGap="l" minColumnWidth={300}>
			{items.map(item => (
				<Box as="li" mb="l" key={item.link}>
					<StackLink href={item.link} gridTemplateColumns="1fr 2fr" gridGap="m">
						<Cover src={`/images/${item.cover}`} alt="" />
						<div>
							<Text as="u" variant="large">
								{item.title}
							</Text>
							<Text>{item.description}</Text>
						</div>
					</StackLink>
				</Box>
			))}
		</Stack>
	);
}
