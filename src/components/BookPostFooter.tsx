import { Stack, Text, Link, BookCover, Feedback, PostAddon } from '.';

export function BookPostFooter() {
	return (
		<PostAddon>
			<Stack direction="row" gap="m">
				<Stack gap="m">
					<Feedback github="washingcode-book">
						If you have any feedback, drop me a line at
					</Feedback>
					<Text>
						<Link href="/book/">Preorder the book now</Link> with 20% discount!
					</Text>
				</Stack>
				<Link href="/book/">
					<BookCover book="washing-your-code" />
				</Link>
			</Stack>
		</PostAddon>
	);
}
