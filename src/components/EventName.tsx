import Group from 'react-group';
import type { ReactNode } from 'react';
import type { TalkType } from '../types/Gig';

const ICONS = {
	talk: {
		alt: 'Talk',
		label: 'Talk',
		suffix: '',
		icon: '📣',
	},
	lightning: {
		alt: 'Lightning talk',
		label: 'Lightning talk',
		suffix: '',
		icon: '⚡️',
	},
	workshop: {
		alt: 'Workshop',
		label: '',
		suffix: 'workshop',
		icon: '🖥',
	},
};

type Props = {
	type: TalkType;
	children: ReactNode;
};

export function EventName({ type = 'talk', children }: Props) {
	const { icon, alt, label, suffix } = ICONS[type];
	return (
		<Group>
			<span title={alt} aria-label={label}>
				{icon}
			</span>
			{children}
			{suffix && ` ${suffix}`}
		</Group>
	);
}
