import Group from 'react-group';
import type { Gig } from '../types/Gig';
import { Box } from './Box';
import { EventName } from './EventName';
import { Heading } from './Heading';
import { Link } from './Link';
import { Stack } from './Stack';
import { Text } from './Text';

interface Props {
	items: Gig[];
}

export function EventList({ items }: Props) {
	return (
		<Stack gap="m">
			{items.map((item) => (
				<Box key={item.date}>
					<Heading level={3} mb="s">
						<Link href={item.url}>{item.name}</Link>
					</Heading>
					<Text>
						<EventName type={item.type}>{item.title}</EventName>
					</Text>
					<Text variant="small">
						<Group separator=", ">
							{item.date}
							{item.location}
							{item.slides && <Link href={item.slides}>slides</Link>}
							{item.video && <Link href={item.video}>video</Link>}
						</Group>
					</Text>
				</Box>
			))}
		</Stack>
	);
}
