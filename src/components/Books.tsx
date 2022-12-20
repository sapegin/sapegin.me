import React from 'react';
import { Box, Grid, Text, QuotedLink } from 'tamia';
import { Book } from '../types';

type Props = {
	items: Book[];
};

type CoverProps = React.ComponentProps<typeof Box> &
	React.ComponentProps<'img'>;

const Cover = (props: CoverProps) => (
	<Box
		as="img"
		maxWidth="100%"
		height="auto"
		sx={{ boxShadow: 'cover' }}
		{...props}
	/>
);

export default function Books({ items }: Props) {
	return (
		<Grid
			as="ul"
			gridGap="l"
			gridTemplateColumns="repeat(auto-fit, minmax(300px,1fr))"
		>
			{items.map((item) => (
				<Box as="li" key={item.link}>
					<Grid
						as={QuotedLink}
						href={item.link}
						gridTemplateColumns="1fr 2fr"
						gridGap="m"
					>
						<Cover src={`/images/${item.cover}`} alt="" />
						<div>
							<Text as="u" variant="large">
								{item.title}
							</Text>
							<Text>{item.description}</Text>
						</div>
					</Grid>
				</Box>
			))}
		</Grid>
	);
}
