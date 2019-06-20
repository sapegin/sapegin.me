import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from 'tamia';
import Icon, { IconName } from './Icon';

const Link = styled.a`
	color: ${themeGet('colors.light')};
	transition: color 0.2s ease-in-out;
	&:focus {
		outline: 2px dotted ${themeGet('colors.hover')};
	}
	&:hover,
	&:focus,
	&:active {
		color: ${themeGet('colors.base')};
	}
`;

type Props = React.ComponentProps<typeof Link> & {
	icon: IconName;
};

const IconLink = ({ icon, ...props }: Props) => (
	<Link {...props}>
		<Icon icon={icon} />
	</Link>
);

export default IconLink;
