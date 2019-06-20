import React from 'react';
import { Text } from 'tamia';

export default function Footer(props: {}) {
	return (
		<Text size="xs" as="footer" {...props}>
			© Artem Sapegin, 2002—{new Date().getFullYear()}
		</Text>
	);
}
