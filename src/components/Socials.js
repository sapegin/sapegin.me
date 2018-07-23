import React from 'react';
import styled from 'react-emotion';
import IconLink from './IconLink';

const Container = styled.div`
	text-align: center;
`;

const Item = styled(IconLink)`
	display: inline-block;
	margin-left: 0.6em;
	margin-right: 0.6em;
	vertical-align: middle;
`;

const Socials = ({ items }) => (
	<Container>
		{items.map(({ id, link, name }) => (
			<Item key={id} href={link} icon={id} title={name} aria-label={name} />
		))}
	</Container>
);

export default Socials;
