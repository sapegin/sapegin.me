import { Typo } from '../../../../shared/components/Typo';
import { EventList } from '../components/EventList';
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
		<div className="flex flex-col gap-4">
			<h2 className="heading-2">{title}</h2>
			<EventList items={items} />
		</div>
	) : undefined;

export function SpeakingPage({
	url,
	title,
	upcomingEvents,
	pastEvents,
}: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<div className="flex flex-col gap-8">
				<p className="typo-intro">
					<Typo>
						I occasionally speak at conferences on design systems,
						component-driven development and React. I also run workshops on
						design systems in React with my friend{' '}
						<a className="link" href="https://www.component-driven.dev">
							Andrey Okonetchnikov
						</a>
						. If you want me to speak at your event or if you want our workshop
						at your event or your company, drop me a line at&nbsp;
						<a className="link" href="mailto:artem@sapegin.me">
							artem@sapegin.me
						</a>
						.
					</Typo>
				</p>
				<EventSection title="Upcoming events" items={upcomingEvents} />
				<EventSection title="Past events" items={pastEvents} />
			</div>
		</PageWithTitle>
	);
}
