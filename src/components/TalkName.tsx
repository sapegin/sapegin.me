import React from 'react';
import Group from 'react-group';
import { TalkType } from '../types';

type Props = {
	type: TalkType;
	children: React.ReactNode;
};

export default function TalkName({ type, children }: Props) {
	return (
		<Group>
			{type === 'lightning' && (
				<span title="Lightning talk" aria-label="Lightning talk">
					⚡️
				</span>
			)}
			{children}
			{type === 'workshop' && 'workshop'}
		</Group>
	);
}
