import { IconCoffee } from '@shared/components/IconCoffee';

export function BuyMeCoffee() {
	return (
		<a
			href="https://www.buymeacoffee.com/sapegin"
			className="button mx-auto gap-2"
		>
			<IconCoffee className="-mt-3" />
			<span>Buy me a coffee</span>
		</a>
	);
}
