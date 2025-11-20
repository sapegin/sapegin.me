import { EventList } from '../components/EventList';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { Stack } from '../components/Stack';
import { TextTypo } from '../components/TextTypo';
import type { Gig } from '../types/Gig';
import { PageWithTitle } from './PageWithTitle';

interface Props {
	url: string;
	title: string;
	upcomingEvents: Gig[];
	pastEvents: Gig[];
}

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
				<TextTypo variant="intro">
					I occasionally speak at conferences on design systems,
					component-driven development and React. I also run workshops on design
					systems in React with my friend{' '}
					<Link href="https://www.component-driven.dev">
						Andrey Okonetchnikov
					</Link>
					. If you want me to speak at your event or if you want our workshop at
					your event or your company, drop me a line at&nbsp;
					<Link href="mailto:artem@sapegin.me">artem@sapegin.me</Link>.
				</TextTypo>
				<EventSection title="Upcoming events" items={upcomingEvents} />
				<EventSection title="Past events" items={pastEvents} />
			</Stack>
		</PageWithTitle>
	);
}
