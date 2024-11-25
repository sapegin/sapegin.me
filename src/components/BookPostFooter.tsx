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
						<Link href="/book/">Get the book now!</Link>
					</Text>
				</Stack>
				<Link href="/book/">
					<BookCover image="washing-your-code" title="Washing your code" />
				</Link>
			</Stack>
		</PostAddon>
	);
}
