import React from 'react';
import Group from 'react-group';
import { Box, Heading, Text, Link } from 'tamia';
import TalkName from './TalkName';
import { Gig } from '../types';

type Props = {
	items: Gig[];
};

export default function EventList({ items }: Props) {
	return (
		<>
			{items.map(item => (
				<Box key={item.date} mb="m">
					<Heading level={3} mb="s">
						<Link href={item.link}>{item.name}</Link>
					</Heading>
					<Text>
						<TalkName type={item.type}>{item.title}</TalkName>
					</Text>
					<Text variant="xsmall">
						<Group separator=", ">
							{item.date}
							{item.location}
							{item.slides && <Link href={item.slides}>slides</Link>}
							{item.video && <Link href={item.video}>video</Link>}
						</Group>
					</Text>
				</Box>
			))}
		</>
	);
}
