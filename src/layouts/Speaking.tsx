import React from 'react';
import { graphql } from 'gatsby';
// eslint-disable-next-line import/default
import sortOn from 'sort-on';
import { Heading, TextContent } from 'tamia';
import Section from '../components/Section';
import EventList from '../components/EventList';
import PageWithTitle from './PageWithTitle';
import { Talk, Event, Gig } from '../types';

type Frontmatter = {
	events: Event[];
	talks: Talk[];
};

type Props = {
	data: {
		markdownRemark: {
			frontmatter: Frontmatter;
			html: string;
		};
	};
};

const NOW = new Date();
const TODAY = new Date(
	NOW.getFullYear(),
	NOW.getMonth(),
	NOW.getDate()
).getTime();

const findById = (events: Talk[], id: string): Talk =>
	events.find(event => event.id === id) as Talk;

const parseEvents = (events: Event[], talks: Talk[]): Gig[] =>
	events.map(event => ({
		...event,
		...findById(talks, event.ref),
		timestamp: Date.parse(event.date),
	}));

const getUpcomingEvents = (events: Gig[]) => {
	const upcomingEvents = events.filter(event => event.timestamp >= TODAY);
	return sortOn(upcomingEvents, 'timestamp');
};

const getPastEvents = (events: Gig[]) => {
	const pastEvents = events.filter(event => event.timestamp < TODAY);
	return sortOn(pastEvents, '-timestamp');
};

const EventSection = ({ title, items }: { title: string; items: Gig[] }) =>
	items.length > 0 ? (
		<Section level={2}>
			<Heading level={2} mb="m">
				{title}
			</Heading>
			<EventList items={items} />
		</Section>
	) : null;

export default function Speaking({
	data: {
		markdownRemark: {
			frontmatter: { events, talks },
			html,
		},
	},
}: Props) {
	const allEvents = parseEvents(events, talks);
	const upcomingEvents = getUpcomingEvents(allEvents);
	const pastEvents = getPastEvents(allEvents);

	return (
		<PageWithTitle title=" is speaking">
			<TextContent dangerouslySetInnerHTML={{ __html: html }} />
			<EventSection title="Upcoming events" items={upcomingEvents} />
			<EventSection title="Past events" items={pastEvents} />
		</PageWithTitle>
	);
}

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
			html
		}
	}
`;
