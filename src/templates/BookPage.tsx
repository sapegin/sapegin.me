import {
	About,
	BookCover,
	Box,
	Button,
	Feedback,
	Heading,
	Link,
	MurderOfCrows,
	PostList,
	Stack,
	Text,
	TextTypo,
	VisuallyHidden,
} from '../components';
import type { Resource } from '../types/Resource';
import { Page } from './Page';

type Props = {
	url: string;
	chapters: Resource[];
};

export function BookPage({ url, chapters }: Props) {
	return (
		<Page url={url}>
			<main>
				<Stack gap="l">
					<Stack gap="s">
						<Heading level={1}>Washing your code</Heading>
						<Heading level={3} as="p">
							A book on clean code for frontend developers
						</Heading>
					</Stack>
					<Stack direction={{ base: 'column', tablet: 'row' }} gap="l">
						<Stack gap="l">
							<VisuallyHidden as="h2">About the book</VisuallyHidden>
							<Stack gap="m">
								<TextTypo variant="intro">
									We read code much more often than we write it — often to make
									a one-line change you have to read and understand hundreds of
									lines of code scattered among dozens of files. That’s why code
									readability is so important.
								</TextTypo>
								<TextTypo>
									On dozens of examples, based on production code, I’ll show you
									how to make your code more readable and maintainable, and how
									to avoid hard-to-track bugs. I’ll show you code smells and
									antipatterns I often see during code reviews (and I review
									lots of code every day!) and will walk you through the
									refactoring process to make your code better.
								</TextTypo>
								<TextTypo>
									These techniques help me every day to write code that my
									colleagues will have no problems working with. All book’s
									examples are written in JavaScript with a bit of TypeScript,
									React, CSS, and HTML.
								</TextTypo>
							</Stack>
							<Stack direction="column" gap="s">
								<Box>
									<Button
										as="a"
										variant="large"
										href="http://leanpub.com/washingcode/c/blog-reader"
									>
										Preorder now!{' '}
										<Box as="span" px="s" verticalAlign="middle" fontSize="s">
											■
										</Box>{' '}
										<del>$20</del> $12
									</Button>
								</Box>
								<Text>Or read selected chapters below</Text>
							</Stack>
						</Stack>
						<Box
							mx={{ base: 'auto', tablet: 0 }}
							order={{ base: -1, tablet: 0 }}
							flexShrink={0}
						>
							<BookCover
								image="washing-your-code-large"
								title="Washing your code"
								width={250}
								height={324}
							/>
						</Box>
					</Stack>
					<Stack gap="m">
						<Heading level={2}>Table of contents</Heading>
						<PostList posts={chapters} />
					</Stack>
					<About>
						I’ve been <Link href="/blog/">blogging</Link> about frontend
						development for almost as many years. My favorite topics are
						component-driven development, testing, and accessibility.
					</About>
					<Stack gap="m">
						<Heading level={2}>Have a question?</Heading>
						<Feedback github="washingcode-book" />
					</Stack>
					<MurderOfCrows />
				</Stack>
			</main>
		</Page>
	);
}
