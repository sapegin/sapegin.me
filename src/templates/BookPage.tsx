import clsx from 'clsx';
import type { ReactNode } from 'react';
import { campaigns } from '../campaigns';
import { About } from '../components/About';
import { BookCover } from '../components/BookCover';
import { FeatureList, FeatureListItem } from '../components/FeatureList';
import { Feedback } from '../components/Feedback';
import { Image } from '../components/Image';
import { Markdown } from '../components/Markdown';
import { MurderOfCrows } from '../components/MurderOfCrows';
import { Typo } from '../components/Typo';
import type { Chapter } from '../types/Chapter';
import { Page } from './Page';

const {
	enabled: isCampaignEnabled,
	badge,
	price,
	discountedPrice,
	url: purchaseUrl,
} = campaigns.washingCode;

interface Props {
	url: string;
	chapters: Chapter[];
	patterns: string[];
	antipatterns: string[];
}

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	image: string;
}

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
	{
		quote:
			'I’ve been following Artem’s blog for a while now, and his advice on clean code is always spot on. This book is a great compilation of the ideas he has shared in his articles, plus much more exclusive content. I highly recommend reading this book regardless of you experience.',
		author: 'Alexei Crecotun',
		role: 'Senior Frontend Developer',
		image: 'readers-alexei.jpg',
	},
];

interface FaqItem {
	question: string;
	answer: ReactNode;
}

const faq: FaqItem[] = [
	{
		question: 'Can I read a sample for free?',
		answer: (
			<>
				Of course! Many chapters are{' '}
				<a className="link" href="#toc">
					available to read online
				</a>
				.
			</>
		),
	},
	{
		question: 'Is the book complete?',
		answer:
			'Yes! After five years of working on the book, it’s finally complete.',
	},
	{
		question: 'Will the book be updated over time?',
		answer: (
			<>
				Yes, I’m planning to keep the book as a living snapshot of my
				programming knowledge, and also update the example with the latest
				JavaScript features. Subscribe to{' '}
				<a className="link" href="https://sapegin.substack.com" target="_blank">
					my newsletter
				</a>{' '}
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
		question: 'Is the book available on paper?',
		answer:
			'Not yet, but I’m planning to publish the dead tree version as soon I finish writing the book.',
	},
	{
		question: 'Do you have a money-back guarantee policy?',
		answer: (
			<>
				Yes, I offer 30-day money back. Write me at{' '}
				<a className="link" href="mailto:artem@sapegin.me">
					artem@sapegin.me
				</a>{' '}
				if you’re unhappy with the book.
			</>
		),
	},
	{
		question:
			'I bought a book on LeanPub, can I get beautiful custom PDF and EPUB files?',
		answer: (
			<>
				Absolutely, write me at{' '}
				<a className="link" href="mailto:artem@sapegin.me">
					artem@sapegin.me
				</a>
				.
			</>
		),
	},
	{
		question: 'Can I buy multiple copies for my team at a reduced price?',
		answer: (
			<>
				Of course, write me at{' '}
				<a className="link" href="mailto:artem@sapegin.me">
					artem@sapegin.me
				</a>
				.
			</>
		),
	},
	{
		question: 'Do you offer purchasing power parity or student discounts?',
		answer: (
			<>
				Gumroad offers purchasing power parity, for a student discount, write me
				at{' '}
				<a className="link" href="mailto:artem@sapegin.me">
					artem@sapegin.me
				</a>
				.
			</>
		),
	},
];

function TheButton() {
	return (
		<a href={purchaseUrl} className="button">
			Get the book!{' '}
			<span className="px-2 align-middle text-sm" aria-hidden="true">
				■
			</span>{' '}
			{isCampaignEnabled ? (
				<>
					<del>€{price}</del> €{discountedPrice}
				</>
			) : (
				<>€{price}</>
			)}
		</a>
	);
}

function ChapterList({ chapters }: { chapters: Chapter[] }) {
	return (
		<ul
			className="
     grid grid-cols-1 gap-8
     md:grid-cols-2
   "
		>
			{chapters.map((chapter) => (
				<li
					key={chapter.url ?? chapter.title}
					className={clsx(
						'grid gap-1',
						chapter.title === 'Other techniques' && 'md:col-span-full'
					)}
				>
					<p className="typo-semilarge">
						{chapter.url ? (
							<a className="link" href={chapter.url}>
								{chapter.title}
							</a>
						) : (
							chapter.title
						)}
					</p>
					{chapter.sections.length > 0 ? (
						<div
							className="
         grid grid-cols-1 gap-x-8 gap-y-2
         md:grid-cols-2
       "
						>
							{chapter.sections.map((section) => (
								<p key={section} className="typo-small">
									{section}
								</p>
							))}
						</div>
					) : (
						<p className="typo-small">
							<Typo>
								<Markdown text={chapter.description} />
							</Typo>
						</p>
					)}
				</li>
			))}
		</ul>
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
		<ul
			className="
     grid grid-cols-1 gap-4
     md:grid-cols-2
     lg:grid-cols-3
   "
		>
			{patterns.map((pattern) => (
				<li key={pattern} className="flex flex-col gap-1">
					<p
						className={clsx('typo-semilarge', strikethrough && 'line-through')}
					>
						<Markdown text={pattern} />
					</p>
				</li>
			))}
		</ul>
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
		<blockquote className="flex flex-col gap-1">
			<div>
				<p className="border-2 border-solid p-4 typo-body">
					<Typo>{quote}</Typo>
				</p>
				<svg
					width={12}
					height={10}
					fillRule="evenodd"
					strokeLinejoin="round"
					strokeMiterlimit="2"
					clipRule="evenodd"
					viewBox="0 0 6 5"
					className="-mt-0.5 ml-4"
				>
					<path
						d="M0 0h1v5H0zM1 4h1v1H1zM2 3h1v1H2zM3 2h1v1H3zM4 1h1v1H4zM5 0h1v1H5z"
						className="fill-current"
					/>
					<path d="M1 0H5v1H1.001z" className="fill-background" />
				</svg>
			</div>
			<footer className="flex items-center gap-2">
				<img
					src={`/images/book/${image}`}
					width={40}
					height={40}
					alt=""
					loading="lazy"
					className="rounded-full"
				/>
				<p className="flex flex-col gap-1">
					<span className="typo-small leading-none">{author}</span>
					<span className="typo-small leading-none">{role}</span>
				</p>
			</footer>
		</blockquote>
	);
}

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
		<div className="book book-spread">
			<Image
				src={`/images/book/${image}`}
				width={width}
				height={height}
				alt={alt}
				className="m-0"
			/>
		</div>
	);
}

function Features() {
	return (
		<div
			className="
     grid grid-cols-1 gap-8
     md:grid-cols-[2fr_1fr]
   "
		>
			<div>
				<Spread image="spread.png" />
			</div>
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
		</div>
	);
}

export function BookPage({ url, chapters, patterns, antipatterns }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-2">
					{isCampaignEnabled && <p className="typo-flag">{badge}</p>}
					<h1 className="heading-1">Washing your code</h1>
					<p className="heading-3">
						A book on clean code for frontend developers
					</p>
				</div>
				<section
					className="
       flex flex-col gap-8
       md:flex-row
     "
				>
					<div className="flex flex-col gap-8">
						<h2 className="sr-only">About the book</h2>
						<div className="flex flex-col gap-4">
							<p className="typo-intro">
								<Typo>
									We read code much more often than we write it — often to make
									a one-line change you have to read and understand hundreds of
									lines of code scattered among dozens of files. That’s why code
									readability is so important.
								</Typo>
							</p>
							<p className="typo-body">
								<Typo>
									On dozens of examples, based on production code, I’ll show you
									how to make your code more readable and maintainable, and how
									to avoid hard-to-track bugs. I’ll show you code smells and
									antipatterns I often see during code reviews (and I review
									lots of code every day!) and will walk you through the
									refactoring process to make your code better.
								</Typo>
							</p>
							<p className="typo-body">
								<Typo>
									These techniques and patterns help me every day to write code
									that my colleagues will have no problems working with. All
									book’s examples are written in JavaScript with a bit of
									TypeScript, React, CSS, and HTML.
								</Typo>
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<div>
								<TheButton />
							</div>
							<p className="typo-body">
								<a
									className="link"
									href="https://www.amazon.com/dp/B0DK9HHJ1R/"
								>
									Also as a paperback and Kindle edition on Amazon
								</a>
							</p>
							<p className="typo-body">
								<a className="link" href="#toc">
									Read selected chapters online
								</a>
							</p>
						</div>
					</div>
					<div
						className="
        -order-1 mx-auto shrink-0
        md:order-0 md:mx-0
      "
					>
						<BookCover
							image="washing-your-code-large"
							title="Washing your code"
							width={250}
							height={324}
						/>
					</div>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">What’s inside?</h2>
					<Features />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2" id="toc">
						Table of contents
					</h2>
					<ChapterList chapters={chapters} />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">Techniques &amp; patterns</h2>
					<p className="typo-body">
						<Typo>
							Here’s a list of all the techniques and patterns described in the
							book.
						</Typo>
					</p>
					<PatternList patterns={patterns} />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">Code smells &amp; antipatterns</h2>
					<p className="typo-body">
						<Typo>
							Here’s a list of all the code smells and antipatterns described in
							the book.
						</Typo>
					</p>
					<PatternList patterns={antipatterns} strikethrough />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">What readers are saying?</h2>
					<div
						className="
        grid grid-cols-1 gap-8
        md:grid-cols-2
      "
					>
						{testimonials.map((testimonial) => (
							<Testimonial key={testimonial.author} {...testimonial} />
						))}
					</div>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">Frequently asked questions</h2>
					<div className="flex flex-col gap-4">
						{faq.map(({ question, answer }) => (
							<article key={question}>
								<h3 className="typo-body font-bold">
									<Typo>{question}</Typo>
								</h3>
								<p className="typo-body">
									<Typo>{answer}</Typo>
								</p>
							</article>
						))}
					</div>
				</section>
				<div className="mx-auto">
					<TheButton />
				</div>
				<About>
					I’ve been{' '}
					<a className="link" href="/blog/">
						blogging
					</a>{' '}
					about frontend development for almost as many years. My favorite
					topics are component-driven development, testing, and accessibility.
				</About>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">Have a question?</h2>
					<Feedback github="washingcode-book" />
				</section>
				<MurderOfCrows />
			</div>
		</Page>
	);
}
