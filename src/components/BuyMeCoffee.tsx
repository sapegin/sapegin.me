import { Box } from './Box';
import { Stack } from './Stack';
import { IconCoffee } from './IconCoffee';
import { Button } from './Button';
import { Flex } from './Flex';

export function BuyMeCoffee() {
	return (
		<Flex justifyContent="center">
			<Button
				as="a"
				variant="coffee"
				href="https://www.buymeacoffee.com/sapegin"
			>
				<Stack
					as="span"
					display="inline-flex"
					direction="row"
					gap="s"
					alignItems="center"
				>
					<Box mt={-12}>
						<IconCoffee variant="coffee" />
					</Box>
					<Box>Buy me a coffee</Box>
				</Stack>
			</Button>
		</Flex>
	);
}
