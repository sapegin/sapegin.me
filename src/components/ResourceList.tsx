import type { Resource } from '../types/Resource';
import { Badge } from './Badge';

interface Props {
	items: Resource[];
}

export function ResourceList({ items }: Props) {
	return (
		<ul className="grid-auto-wide grid gap-4">
			{items.map((item) => (
				<li key={item.url ?? item.title} className="gap-2">
					<p className="typo-large">
						{item.url ? (
							<a className="link" href={item.url}>
								{item.title}
							</a>
						) : (
							item.title
						)}
					</p>
					{item.description && <p className="typo-body">{item.description}</p>}
					{item.badges && (
						<p className="flex items-center gap-1">
							{item.badges.map((badge) => (
								<Badge key={badge}>{badge}</Badge>
							))}
						</p>
					)}
				</li>
			))}
		</ul>
	);
}
