import { Stack } from './Stack';
import { SubscriptionForm } from './SubscriptionForm';
import { VisuallyHidden } from './VisuallyHidden';
import { BuyMeCoffee } from './BuyMeCoffee';

export function Support() {
	return (
		<Stack as="aside" gap="m" aria-label="Newsletter & support">
			<VisuallyHidden as="h2">Join the newsletter</VisuallyHidden>
			<SubscriptionForm />
			<VisuallyHidden as="h2">Support my work</VisuallyHidden>
			<BuyMeCoffee />
		</Stack>
	);
}
