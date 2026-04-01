import { Group } from '../packages/tamia/components/Group';
import type { Gig } from '../types/Gig';
import { EventName } from './EventName';

interface Props {
	items: Gig[];
}

export function EventList({ items }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{items.map((item) => (
				<div key={item.date}>
					<h3 className="mb-2 heading-3">
						<a className="link" href={item.url}>
							{item.name}
						</a>
					</h3>
					<p className="typo-body">
						<EventName type={item.type}>{item.title}</EventName>
					</p>
					<p className="typo-small">
						<Group separator=", ">
							{item.date}
							{item.location}
							{item.slides && (
								<a className="link" href={item.slides}>
									slides
								</a>
							)}
							{item.video && (
								<a className="link" href={item.video}>
									video
								</a>
							)}
						</Group>
					</p>
				</div>
			))}
		</div>
	);
}
