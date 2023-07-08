import { Stack, Heading, Text, SubscriptionForm } from '.';

export function Subscription() {
	return (
		<Stack gap="m">
			<Heading as="h2" level={3}>
				Join the newsletter
			</Heading>
			<Text>
				Enjoyed the article? Subscribe to get my latest articles, books, and
				other content on testing, design systems, accessibility, and everything
				frontend into your inbox. <i>No spam, unsubscribe at any time.</i>
			</Text>
			<SubscriptionForm />
		</Stack>
	);
}
