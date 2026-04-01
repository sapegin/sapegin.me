import type { ReactNode } from 'react';
import { Group } from '../../../packages/tamia/components/Group';
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

interface Props {
	type: TalkType;
	children: ReactNode;
}

export function EventName({ type = 'talk', children }: Props) {
	const { icon, alt, label, suffix } = ICONS[type];
	return (
		<Group>
			<span title={alt}>
				{label && <span className="sr-only">{label}</span>}
				{icon}
			</span>
			{children}
			{suffix && ` ${suffix}`}
		</Group>
	);
}
