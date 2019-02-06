import React from 'react';
import { Text } from 'tamia';

const Footer = props => (
	<Text size="xs" as="footer" {...props}>
		© Artem Sapegin, 2002—{new Date().getFullYear()}
	</Text>
);

export default Footer;
