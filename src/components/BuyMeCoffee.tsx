import { Button } from './Button';
import { IconCoffee } from './IconCoffee';

export function BuyMeCoffee() {
	return (
		<div className="flex content-center">
			<Button as="a" href="https://www.buymeacoffee.com/sapegin">
				<span className="inline-flex flex-row items-center gap-2">
					<span className="-mt-[12px]">
						<IconCoffee variant="coffee" />
					</span>
					<span>Buy me a coffee</span>
				</span>
			</Button>
		</div>
	);
}
