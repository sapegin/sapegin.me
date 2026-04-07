import { BuyMeCoffee } from '../components/BuyMeCoffee';
import { SubscriptionForm } from './SubscriptionForm';

export function Support() {
	return (
		<aside className="flex flex-col gap-4" aria-label="Newsletter & support">
			<h2 className="sr-only">Join the newsletter</h2>
			<SubscriptionForm />
			<h2 className="sr-only">Support my work</h2>
			<BuyMeCoffee />
		</aside>
	);
}
