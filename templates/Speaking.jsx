import { flow, sortBy, reverse, filter } from 'lodash/fp';
import { Beta } from 'tamia/lib/components/Text';
import EventList from './components/EventList';
import Section from './components/Section';
import PageWithTitle from './PageWithTitle';

const NOW = new Date();
const TODAY = new Date(
	NOW.getFullYear(),
	NOW.getMonth(),
	NOW.getDate()
).getTime();

const parseEvents = (events, talks) =>
	events.map(event => ({
		...event,
		...talks[event.ref],
		timestamp: Date.parse(event.date),
	}));

const getUpcomingEvents = flow(
	filter(event => event.timestamp >= TODAY),
	sortBy('timestamp')
);

const getPastEvents = flow(
	filter(event => event.timestamp < TODAY),
	sortBy('timestamp'),
	reverse
);

export default function({ events, talks, ...rest }) {
	events = parseEvents(events, talks);
	return (
		<PageWithTitle {...rest}>
			<Section level={2}>
				<Beta>Upcoming events</Beta>
				<EventList items={getUpcomingEvents(events)} />
			</Section>
			<Section level={2}>
				<Beta>Past events</Beta>
				<EventList items={getPastEvents(events)} />
			</Section>
		</PageWithTitle>
	);
}
