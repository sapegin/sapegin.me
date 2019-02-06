import React from 'react';
import Group from 'react-group';

const TalkName = ({ type, children }) => (
	<Group>
		{type === 'lightning' && (
			<span role="img" title="Lightning talk" aria-label="Lightning talk">
				⚡️
			</span>
		)}
		{children}
		{type === 'workshop' && 'workshop'}
	</Group>
);

export default TalkName;
