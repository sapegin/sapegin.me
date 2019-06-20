import React from 'react';
import styled from '@emotion/styled';
import IconLink from './IconLink';
import { Social } from '../types';

type Props = {
	items: Social[];
};

const Container = styled.div`
	text-align: center;
`;

const Item = styled(IconLink)`
	display: inline-block;
	margin-left: 0.6em;
	margin-right: 0.6em;
	vertical-align: middle;
`;

const Socials = ({ items }: Props) => (
	<Container>
		{items.map(({ id, link, name }) => (
			<Item key={id} href={link} icon={id} title={name} aria-label={name} />
		))}
	</Container>
);

export default Socials;
