import { IconCoffee } from '@shared/components/IconCoffee';

export function BuyMeCoffee() {
	return (
		<a
			href="https://www.buymeacoffee.com/sapegin"
			className="button mx-auto inline-flex items-center gap-2 button-large"
		>
			<IconCoffee className="-mt-[10px]" />
			<span>Buy me a coffee</span>
		</a>
	);
}
