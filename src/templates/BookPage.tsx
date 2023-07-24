import {
	Box,
	Stack,
	Heading,
	Text,
	Link,
	VisuallyHidden,
	Button,
	PostList,
	BookCover,
	BookFeedback,
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
					<Stack direction={{ mobile: 'column', tablet: 'row' }} gap="l">
						<Stack gap="l">
							<VisuallyHidden as="h2">About the book</VisuallyHidden>
							<Stack gap="m">
								<Text variant="intro">
									We read code much more often than we write it — often to make
									a one-line change you have to read and understand hundreds of
									lines of code scattered among dozens of files. That’s why code
									readability is so important.
								</Text>
								<Text>
									On dozens of examples, based on production code, I’ll show you
									how to make your code more readable and maintainable, and how
									to avoid hard-to-track bugs. I’ll show you code smells and
									antipatterns I often see during code reviews (and I review
									lots of code every day!) and will walk you through the
									refactoring process to make your code better.
								</Text>
								<Text>
									These techniques help me every day to write code that my
									colleagues will have no problems working with. All book’s
									examples are written in JavaScript with a bit of TypeScript,
									React, CSS, and HTML.
								</Text>
							</Stack>
							<Stack direction="column" gap="s">
								<Box>
									<Button
										as="a"
										variant="large"
										href="http://leanpub.com/washingcode/c/blog-reader"
									>
										Preorder now!{' '}
										<Text
											as="span"
											px="s"
											verticalAlign="middle"
											fontSize="s"
											color="inherit"
										>
											■
										</Text>{' '}
										<del>$20</del> $12
									</Button>
								</Box>
								<Text>Or read selected chapters below</Text>
							</Stack>
						</Stack>
						<Box mx={{ mobile: 'auto', tablet: 0 }} order={[-1, null, 0]}>
							<BookCover book="washing-your-code" variant="large" />
						</Box>
					</Stack>
					<Stack gap="m">
						<Heading level={2}>Table of contents</Heading>
						<PostList posts={chapters} />
					</Stack>
					<Stack direction={{ mobile: 'column', tablet: 'row' }} gap="l">
						<Box mx={{ mobile: 'auto', tablet: 0 }}>
							<img
								src="/images/artem-sapegin.webp"
								alt="Artem Sapegin"
								width="200"
								height="200"
								style={{ borderRadius: '50%' }}
							/>
						</Box>
						<Stack gap="l">
							<Stack gap="m">
								<Heading level={2}>About the author</Heading>
								<Text>Hola! I’m Artem.</Text>
								<Text>
									I’m a software engineer with 20 years of experience in small
									startups and large corporations, like Wayfair, Mail.ru, Here
									Technologies, Omio, and Badoo, I created React Styleguidist (a
									tool to create React components and share them with your
									team), among many other open source projects.
								</Text>
								<Text>
									I’ve been <Link href="/">blogging</Link> about frontend
									development for almost as many years. My favorite topics are
									component-driven development, testing, and accessibility.
								</Text>
							</Stack>
						</Stack>
					</Stack>
					<Stack gap="m">
						<Heading level={2}>Have a question?</Heading>
						<BookFeedback>Drop me a line at</BookFeedback>
					</Stack>
				</Stack>
			</main>
		</Page>
	);
}
