import type { ReactNode } from 'react';
import {
	About,
	BookCover,
	Box,
	Button,
	Feedback,
	Grid,
	Heading,
	Link,
	MurderOfCrows,
	Stack,
	Text,
	TextTypo,
	VisuallyHidden,
	Image,
	FeatureList,
	FeatureListItem,
	Flex,
} from '../components';
import type { Chapter } from '../types/Chapter';
import { Page } from './Page';
import { Markdown } from '../components/Markdown';

type Props = {
	url: string;
	chapters: Chapter[];
	patterns: string[];
	antipatterns: string[];
};

type TestimonialItem = {
	quote: string;
	author: string;
	role: string;
	image: string;
};

const testimonials: TestimonialItem[] = [
	{
		quote:
			'I’ve been following the author’s blog for quite some time to grab an advice or to catch up on best engineering practices. I was excited to find out there’s a whole dedicated book he was working on 🙌 I’m into several chapters now and already got enlightened on some topics I thought I knew well 🙂 I really like a mix of theory and clear practical examples that are up to a point. It’s never a dry reading so can highly recommend it 👍',
		author: 'Nick Plekhanov',
		role: 'Senior Fullstack Engineer',
		image: 'readers-nick.jpg',
	},
	{
		quote:
			"Artem skillfully highlights common code smells and anti-patterns that I also frequently encounter when reviewing code. Each chapter offers actionable insights on refactoring and improving code readability, which are critical whether you’re just starting out or are a longtime developer looking to polish your skills. I already “felt” the lessons but hadn't really internalized them.  Reading them from someone else sort of fixed them in my understanding of code and how to work with it.",
		author: 'Troy Giunipero',
		role: 'Senior Frontend Developer',
		image: 'readers-troy.jpg',
	},
];

type FaqItem = {
	question: string;
	answer: ReactNode;
};

const faq: FaqItem[] = [
	{
		question: 'Can I read a sample for free?',
		answer: (
			<>
				Of course! Many chapters are{' '}
				<Link href="#toc">available to read online</Link>.
			</>
		),
	},
	{
		question: 'Is the book complete?',
		answer:
			'Almost! I’m planning to finish the book by the end of summer 2024.',
	},
	{
		question: 'Will the book be updated over time?',
		answer: (
			<>
				Yes, I’m planning to keep the book as a living snapshot of my
				programming knowledge, and also update the example with the latest
				JavaScript features. Subscribe to{' '}
				<Link href="https://sapegin.substack.com" target="_blank">
					my newsletter
				</Link>{' '}
				to know about major updates.
			</>
		),
	},
	{
		question: 'Do I need to know JavaScript?',
		answer:
			'Not necessarily, though it will certainly help. However, even if you’re working with other languages, you could still find the book useful.',
	},
	{
		question: 'Is the book available to buy on Amazon?',
		answer:
			'Not yet, but I’m planning to publish the book on Amazon as soon I finish writing the book.',
	},
	{
		question: 'Is the book available on paper?',
		answer:
			'Not yet, but I’m planning to publish the dead tree version as soon I finish writing the book.',
	},
	{
		question: 'Do you have a money-back guarantee policy?',
		answer: (
			<>
				Yes, LeanPub has{' '}
				<Link href="https://leanpub.com/refunds" target="_blank">
					60-day money back
				</Link>
				.
			</>
		),
	},
	{
		question: 'Can I buy multiple copies for my team at a reduced price?',
		answer: (
			<>
				Yes, write me at{' '}
				<Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>.
			</>
		),
	},
	{
		question: 'Do you offer purchasing power parity or student discounts?',
		answer: (
			<>
				Write me at <Link href="mailto:artem@sapegin.ru">artem@sapegin.ru</Link>
				, and we’ll think of something.
			</>
		),
	},
];

function TheButton() {
	return (
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
	);
}

function ChapterList({ chapters }: { chapters: Chapter[] }) {
	return (
		<Grid
			as="ul"
			gap="l"
			gridTemplateColumns={{
				base: '1fr',
				tablet: '1fr 1fr',
			}}
		>
			{chapters.map((chapter) => (
				<Stack
					as="li"
					key={chapter.url ?? chapter.title}
					gap="xs"
					gridColumn={{
						tablet: chapter.title === 'Other techniques' ? '1/3' : undefined,
					}}
				>
					<Text variant="semilarge">
						{chapter.url ? (
							<Link href={chapter.url}>{chapter.title}</Link>
						) : (
							chapter.title
						)}
					</Text>
					{chapter.sections.length > 0 ? (
						<Grid
							columnGap="l"
							rowGap="s"
							gridTemplateColumns={{
								base: '1fr',
								tablet: '1fr 1fr',
							}}
						>
							{chapter.sections.map((section) => (
								<Text key={section} variant="small">
									{section}
								</Text>
							))}
						</Grid>
					) : (
						<TextTypo variant="small">
							<Markdown text={chapter.description} />
						</TextTypo>
					)}
				</Stack>
			))}
		</Grid>
	);
}

function PatternList({
	patterns,
	strikethrough,
}: {
	patterns: string[];
	strikethrough?: boolean;
}) {
	return (
		<Grid
			as="ul"
			rowGap="m"
			columnGap="m"
			gridTemplateColumns={{
				base: '1fr',
				tablet: '1fr 1fr',
				desktop: '1fr 1fr 1fr',
			}}
		>
			{patterns.map((pattern) => (
				<Stack as="li" key={pattern} gap="xs">
					<Text
						variant="semilarge"
						css={{
							textDecoration: strikethrough ? 'line-through' : undefined,
						}}
					>
						<Markdown text={pattern} />
					</Text>
				</Stack>
			))}
		</Grid>
	);
}

function Testimonial({
	quote,
	author,
	role,
	image,
}: {
	quote: string;
	author: string;
	role: string;
	image: string;
}) {
	return (
		<Stack as="blockquote" gap="xs">
			<div>
				<TextTypo
					variant="body"
					p="m"
					css={{
						borderStyle: 'solid',
						borderWidth: 2,
					}}
				>
					{quote}
				</TextTypo>
				<Box
					as="svg"
					width={12}
					height={10}
					fillRule="evenodd"
					strokeLinejoin="round"
					strokeMiterlimit="2"
					clipRule="evenodd"
					viewBox="0 0 6 5"
					css={{ ml: 'm', mt: -2 }}
				>
					<Box
						as="path"
						d="M0 0h1v5H0zM1 4h1v1H1zM2 3h1v1H2zM3 2h1v1H3zM4 1h1v1H4zM5 0h1v1H5z"
						fill="currentColor"
					/>
					<Box as="path" d="M1 0H5v1H1.001z" fill="background" />
				</Box>
			</div>
			<Stack as="footer" direction="row" gap="s" alignItems="center">
				<Box
					as="img"
					src={`/images/book/${image}`}
					width={40}
					height={40}
					alt=""
					loading="lazy"
					borderRadius="round"
				/>
				<Stack as="p" gap="xs">
					<Text as="span" variant="small" lineHeight={1}>
						{author}
					</Text>
					<Text as="span" variant="small" lineHeight={1}>
						{role}
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
}

const colors = {
	shadow: 'rgba(0, 0, 0, 0.1)',
	outlineLight: 'rgba(255, 255, 255, 0.9)',
	outlineDark: 'rgba(0, 0, 0, 0.15)',
	insetLight: 'rgba(0, 0, 0, 0.15)',
};

export function Spread({
	image,
	width,
	height,
	alt = '',
}: {
	image: string;
	width?: number;
	height?: number;
	alt?: string;
}) {
	return (
		<Box
			css={{
				position: 'relative',
				boxShadow: `0 10px 20px ${colors.shadow}`,
				borderRadius: 3,
				borderStyle: 'solid',
				borderWidth: 1,
				borderColor: `${colors.outlineLight} ${colors.outlineDark} ${colors.outlineDark} ${colors.outlineLight}`,
				_before: {
					content: `''`,
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: '50%',
					borderLeft: `1px solid ${colors.insetLight}`,
				},
			}}
		>
			<Image
				src={`/images/book/${image}`}
				width={width}
				height={height}
				alt={alt}
				m={0}
			/>
		</Box>
	);
}

function Features() {
	return (
		<Grid
			gap="l"
			gridTemplateColumns={{
				base: '1fr',
				tablet: '2fr 1fr',
			}}
		>
			<Box>
				<Spread image="spread.png" />
			</Box>
			<FeatureList>
				<FeatureListItem>PDF and EPUB formats</FeatureListItem>{' '}
				<FeatureListItem>
					20 years of experience packed into 400 pages
				</FeatureListItem>
				<FeatureListItem>
					4600 lines of unit-tested code examples
				</FeatureListItem>
				<FeatureListItem>Based on production code</FeatureListItem>
				<FeatureListItem>Up to date: ECMAScript 2024</FeatureListItem>
				<FeatureListItem>No bullshit approach</FeatureListItem>
			</FeatureList>
		</Grid>
	);
}

export function BookPage({ url, chapters, patterns, antipatterns }: Props) {
	return (
		<Page url={url}>
			<Stack gap="xl">
				<Stack gap="s">
					<Heading level={1}>Washing your code</Heading>
					<Heading level={3} as="p">
						A book on clean code for frontend developers
					</Heading>
				</Stack>
				<Stack
					as="section"
					direction={{ base: 'column', tablet: 'row' }}
					gap="l"
				>
					<Stack gap="l">
						<VisuallyHidden as="h2">About the book</VisuallyHidden>
						<Stack gap="m">
							<TextTypo variant="intro">
								We read code much more often than we write it — often to make a
								one-line change you have to read and understand hundreds of
								lines of code scattered among dozens of files. That’s why code
								readability is so important.
							</TextTypo>
							<TextTypo>
								On dozens of examples, based on production code, I’ll show you
								how to make your code more readable and maintainable, and how to
								avoid hard-to-track bugs. I’ll show you code smells and
								antipatterns I often see during code reviews (and I review lots
								of code every day!) and will walk you through the refactoring
								process to make your code better.
							</TextTypo>
							<TextTypo>
								These techniques and patterns help me every day to write code
								that my colleagues will have no problems working with. All
								book’s examples are written in JavaScript with a bit of
								TypeScript, React, CSS, and HTML.
							</TextTypo>
						</Stack>
						<Stack direction="column" gap="s">
							<Box>
								<TheButton />
							</Box>
							<Text>
								<Link href="#toc">Or read selected chapters below</Link>
							</Text>
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
				<Stack as="section" gap="m">
					<Heading level={2}>What’s inside?</Heading>
					<Features />
				</Stack>
				<Stack as="section" gap="m">
					<Heading level={2} id="toc">
						Table of contents
					</Heading>
					<ChapterList chapters={chapters} />
				</Stack>
				<Stack as="section" gap="m">
					<Heading level={2} id="toc">
						Techniques &amp; patterns
					</Heading>
					<TextTypo>
						Here’s a list of all the techniques and patterns described in the
						book.
					</TextTypo>
					<PatternList patterns={patterns} />
				</Stack>
				<Stack as="section" gap="m">
					<Heading level={2} id="toc">
						Code smells &amp; antipatterns
					</Heading>
					<TextTypo>
						Here’s a list of all the code smells and antipatterns described in
						the book.
					</TextTypo>
					<PatternList patterns={antipatterns} strikethrough />
				</Stack>
				<Stack as="section" gap="m">
					<Heading level={2}>What readers are saying?</Heading>
					<Grid
						gap="l"
						gridTemplateColumns={{
							base: '1fr',
							tablet: '1fr 1fr',
						}}
					>
						{testimonials.map((testimonial) => (
							<Testimonial key={testimonial.author} {...testimonial} />
						))}
					</Grid>
				</Stack>
				<Stack as="section" gap="m">
					<Heading level={2}>Frequently asked questions</Heading>
					<Stack gap="m">
						{faq.map(({ question, answer }) => (
							<article key={question}>
								<TextTypo as="h3" variant="bold">
									{question}
								</TextTypo>
								<TextTypo>{answer}</TextTypo>
							</article>
						))}
					</Stack>
				</Stack>
				<Flex justifyContent="center">
					<TheButton />
				</Flex>
				<About>
					I’ve been <Link href="/blog/">blogging</Link> about frontend
					development for almost as many years. My favorite topics are
					component-driven development, testing, and accessibility.
				</About>
				<Stack as="section" gap="m">
					<Heading level={2}>Have a question?</Heading>
					<Feedback github="washingcode-book" />
				</Stack>
				<MurderOfCrows />
			</Stack>
		</Page>
	);
}
