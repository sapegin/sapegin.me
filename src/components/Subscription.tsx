import { Stack } from './Stack';
import { Heading } from './Heading';
import { TextTypo } from './TextTypo';

interface Props {
	list?: 'default' | 'photo';
}

export function Subscription({ list = 'default' }: Props) {
	const substackId = list === 'default' ? 'sapegin' : 'morningphotos';
	const iframeUrl = `https://${substackId}.substack.com/embed`;
	return (
		<Stack as="aside" gap="m" aria-label="Newsletter">
			<Heading as="h2" level={3}>
				Join the newsletter
			</Heading>
			<TextTypo>
				{list === 'default' ? (
					<>
						Enjoyed the article? Subscribe to get my latest articles, books, and
						other content on testing, design systems, accessibility, and
						everything frontend into your inbox.
						<br />
						<i>No spam, unsubscribe at any time.</i>
					</>
				) : (
					<>
						Like my photos? Subscribe to get news about my photography projects,
						zines, and so on into your inbox.
						<br />
						<i>No spam, very rare, unsubscribe at any time.</i>
					</>
				)}
			</TextTypo>
			<iframe
				title="Newsletter form"
				src={iframeUrl}
				width="100%"
				height="320"
				loading="lazy"
			/>
		</Stack>
	);
}
