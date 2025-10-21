import type { ReactNode } from 'react';
import { Box } from '../components/Box';
import { Heading } from '../components/Heading';
import { Image } from '../components/Image';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { TextTypo } from '../components/TextTypo';

interface Props {
	children: ReactNode;
}

export function About({ children }: Props) {
	return (
		<Stack as="section" direction={{ base: 'column', tablet: 'row' }} gap="l">
			<Box mx={{ base: 'auto', tablet: 0 }} flexShrink={0}>
				<Image
					src="/images/artem-sapegin.avif"
					alt="Artem Sapegin"
					width={200}
					height={200}
					borderRadius="round"
				/>
			</Box>
			<Stack gap="l">
				<Stack gap="m">
					<Heading level={2}>About the author</Heading>
					<Text>Hola! I’m Artem.</Text>
					<TextTypo>
						I’m a software engineer with 20 years of experience in small
						startups and large corporations, like Wayfair, Mail.ru, Here
						Technologies, Omio, Stage+, and Badoo. I created React Styleguidist
						(a tool to create React components and share them with your team),
						among many other open source projects.
					</TextTypo>
					<TextTypo>{children}</TextTypo>
				</Stack>
			</Stack>
		</Stack>
	);
}
