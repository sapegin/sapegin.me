import { Button } from './Button';
import { IconCoffee } from './IconCoffee';

export function BuyMeCoffee() {
	return (
		<div className="flex justify-center">
			<Button
				as="a"
				href="https://www.buymeacoffee.com/sapegin"
				variant="large"
				className="inline-flex items-center gap-2"
			>
				<IconCoffee className="-mt-[12px]" />
				<span>Buy me a coffee</span>
			</Button>
		</div>
	);
}
