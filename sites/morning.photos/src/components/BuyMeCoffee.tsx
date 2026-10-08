import { IconCoffee } from '@shared/components/IconCoffee';

export function BuyMeCoffee() {
	return (
		<a
			href="https://www.buymeacoffee.com/sapegin"
			className="button-large mx-auto gap-2"
		>
			<IconCoffee className="-mt-2.5" />
			<span>Buy me a coffee</span>
		</a>
	);
}
