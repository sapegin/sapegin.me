import React from 'react';
import Group from 'react-group';
import { TalkType } from '../types';

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
	children: React.ReactNode;
};

export default function TalkName({ type = 'talk', children }: Props) {
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
