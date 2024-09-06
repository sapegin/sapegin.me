import { Stack, Heading, Text, Link, EventList } from '../components';
import { PageWithTitle } from './PageWithTitle';
import type { Gig } from '../types/Gig';

type Props = {
	url: string;
	title: string;
	upcomingEvents: Gig[];
	pastEvents: Gig[];
};

const EventSection = ({ title, items }: { title: string; items: Gig[] }) =>
	items.length > 0 ? (
		<Stack gap="m">
			<Heading level={2}>{title}</Heading>
			<EventList items={items} />
		</Stack>
	) : undefined;

export function SpeakingPage({
	url,
	title,
	upcomingEvents,
	pastEvents,
}: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				<Text variant="intro">
					I occasionally speak at conferences on&nbsp;design systems,
					component-driven development and React. I&nbsp;also run workshops
					on&nbsp; design systems in&nbsp;React with my&nbsp;friend{' '}
					<Link href="https://component-driven.io/">
						Andrey&nbsp;Okonetchnikov
					</Link>
					. If you want me to speak at your event or&nbsp;if&nbsp;you want
					our&nbsp;workshop at&nbsp;your event or&nbsp;your company,
					drop&nbsp;me a&nbsp;line at&nbsp;
					<Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>.
				</Text>
				<EventSection title="Upcoming events" items={upcomingEvents} />
				<EventSection title="Past events" items={pastEvents} />
			</Stack>
		</PageWithTitle>
	);
}
