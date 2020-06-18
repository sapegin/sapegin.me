import React from 'react';
import { Text } from 'tamia';

export default function Footer() {
	return (
		<Text variant="xsmall" as="footer">
			© Artem Sapegin, 2002—{new Date().getFullYear()}
		</Text>
	);
}
