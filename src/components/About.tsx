import type { ReactNode } from 'react';
import { Box, Stack, Heading, Text, Link } from '../components';

type Props = {
	children: ReactNode;
};

export function About({ children }: Props) {
	return (
		<Stack direction={{ mobile: 'column', tablet: 'row' }} gap="l">
			<Box mx={{ mobile: 'auto', tablet: 0 }}>
				<img
					src="/images/artem-sapegin.webp"
					alt="Artem Sapegin"
					width="200"
					height="200"
					style={{ borderRadius: '50%' }}
				/>
			</Box>
			<Stack gap="l">
				<Stack gap="m">
					<Heading level={2}>About the author</Heading>
					<Text>Hola! I’m Artem.</Text>
					<Text>
						I’m a software engineer with 20 years of experience in small
						startups and large corporations, like Wayfair, Mail.ru, Here
						Technologies, Omio, and Badoo, I created React Styleguidist (a tool
						to create React components and share them with your team), among
						many other open source projects.
					</Text>
					<Text>{children}</Text>
				</Stack>
			</Stack>
		</Stack>
	);
}
