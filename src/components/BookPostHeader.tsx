import { Stack, Text, Link, BookCover, PostAddon } from '.';

export function BookPostHeader() {
	return (
		<PostAddon>
			<Stack direction="row" gap="m">
				<Stack gap="m">
					<Text variant="intro">
						You’re reading an excerpt of my upcoming book on clean code for
						frontend developers, “Washing your code.”
					</Text>
					<Text>
						<Link href="/book/">Preorder the book now</Link> with 20% discount!
					</Text>
				</Stack>
				<Link href="/book/">
					<BookCover image="washing-your-code" title="Washing your code" />
				</Link>
			</Stack>
		</PostAddon>
	);
}
