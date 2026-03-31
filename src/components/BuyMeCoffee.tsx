import { IconCoffee } from './IconCoffee';

export function BuyMeCoffee() {
	return (
		<a
			href="https://www.buymeacoffee.com/sapegin"
			className="button mx-auto inline-flex items-center gap-2"
		>
			<IconCoffee className="-mt-[12px]" />
			<span>Buy me a coffee</span>
		</a>
	);
}
