import React from 'react';
import Group from 'react-group';
import { Box, Heading, Text, Link } from 'tamia';
import TalkName from './TalkName';

const EventList = ({ items }) =>
	items.map(item => (
		<Box key={item.date} mb="m">
			<Heading level={3} mb="s">
				<Link href={item.link}>{item.name}</Link>
			</Heading>
			<Text>
				<TalkName type={item.type}>{item.title}</TalkName>
			</Text>
			<Text size="xs">
				<Group separator=", ">
					{item.date}
					{item.location}
					{item.slides && <Link href={item.slides}>slides</Link>}
					{item.video && <Link href={item.video}>video</Link>}
				</Group>
			</Text>
		</Box>
	));

export default EventList;
