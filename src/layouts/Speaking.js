import React from 'react';
import { graphql } from 'gatsby';
import { flow, sortBy, reverse, filter } from 'lodash/fp';
import { Heading } from 'tamia';
import Section from '../components/Section';
import EventList from '../components/EventList';
import PageWithTitle from './PageWithTitle';

const NOW = new Date();
const TODAY = new Date(
	NOW.getFullYear(),
	NOW.getMonth(),
	NOW.getDate()
).getTime();

const findById = (events, id) => events.find(event => event.id === id);

const parseEvents = (events, talks) =>
	events.map(event => ({
		...event,
		...findById(talks, event.ref),
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

const EventSection = ({ title, items }) =>
	items.length > 0 && (
		<Section level={2}>
			<Heading level={2} mb="m">
				{title}
			</Heading>
			<EventList items={items} />
		</Section>
	);

const Speaking = ({
	data: {
		markdownRemark: {
			frontmatter: { events, talks },
		},
	},
}) => {
	const allEvents = parseEvents(events, talks);
	const upcomingEvents = getUpcomingEvents(allEvents);
	const pastEvents = getPastEvents(allEvents);
	return (
		<PageWithTitle title=" is speaking">
			<EventSection title="Upcoming events" items={upcomingEvents} />
			<EventSection title="Past events" items={pastEvents} />
		</PageWithTitle>
	);
};

export default Speaking;

export const pageQuery = graphql`
	query SpeakingPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
				events {
					ref
					name
					date
					location
					link
				}
				talks {
					id
					title
					type
					slides
					video
				}
			}
		}
	}
`;
