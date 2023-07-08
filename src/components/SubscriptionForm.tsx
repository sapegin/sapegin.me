import { Box, VisuallyHidden, Input, Button, InputGroup } from '.';

export function SubscriptionForm() {
	return (
		<form method="post" action="https://tinyletter.com/sapegin" target="_blank">
			<InputGroup>
				<Box as="label" width="100%">
					<VisuallyHidden>Your email</VisuallyHidden>
					<Input
						name="email"
						type="email"
						required
						autoComplete="home email"
						autoCapitalize="off"
						autoCorrect="off"
						placeholder="Your email"
						defaultValue=""
					/>
				</Box>
				<Box flexShrink={0}>
					<Button type="submit">Subscribe</Button>
				</Box>
			</InputGroup>
		</form>
	);
}
