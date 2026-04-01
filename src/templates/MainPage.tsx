import { BookLink } from '../components/BookLink';
import { Hola } from '../components/Hola';
import { LinkWithIcon } from '../components/LinkWithIcon';
import { PostList } from '../components/PostList';
import { ResourceList } from '../components/ResourceList';
import { ME_BLUESKY_URL, ME_GITHUB_URL, ME_MASTODON_URL } from '../constants';
import type { Post } from '../types/Post';
import type { Resource } from '../types/Resource';
import { Page } from './Page';

interface Props {
	url: string;
	blogPosts: Post[];
	books: Resource[];
	writing: Resource[];
	projects: Resource[];
}

function Intro() {
	return (
		<section className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<Hola>Hey, I’m Artem!</Hola>
				<p className="typo-intro">
					<LinkWithIcon icon="mail" href="mailto:artem@sapegin.me">
						Write to me
					</LinkWithIcon>
					,{' '}
					<LinkWithIcon icon="comment" href={`${ME_GITHUB_URL}/ama`}>
						ask me anything
					</LinkWithIcon>
					,
					<br />
					follow me on{' '}
					<LinkWithIcon icon="mastodon" href={ME_MASTODON_URL} rel="me">
						Mastodon
					</LinkWithIcon>
					,{' '}
					<LinkWithIcon icon="bluesky" href={ME_BLUESKY_URL}>
						Bluesky
					</LinkWithIcon>
					,{' '}
					<LinkWithIcon icon="github" href={ME_GITHUB_URL}>
						GitHub
					</LinkWithIcon>
					, or{' '}
					<LinkWithIcon icon="devto" href="https://dev.to/sapegin">
						Dev.to
					</LinkWithIcon>
					,<br />
					or keep reading about me:
				</p>
			</div>
		</section>
	);
}

function Writing({
	books,
	writing,
	blogPosts,
}: Pick<Props, 'books' | 'writing' | 'blogPosts'>) {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">I write about frontend development</h2>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h3 className="heading-3">My books</h3>
					<ul className="grid-auto-wide grid gap-8">
						{books.map((book) => (
							<li key={book.url}>
								<BookLink book={book} />
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="heading-3">Recent blog posts</h3>
					<PostList posts={blogPosts} showDates />
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="heading-3">More writing</h3>
					<PostList posts={writing} showDescriptions />
				</div>
			</div>
			<p className="typo-body">
				Sometimes, I also{' '}
				<a className="link" href="/speaking/">
					speak at conferences
				</a>
				.
			</p>
		</section>
	);
}

function Projects({ projects }: Pick<Props, 'projects'>) {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">I do things sometimes</h2>
			<div className="flex flex-col gap-8">
				<ResourceList items={projects} />
			</div>
			<p className="typo-body">
				See many more projects on{' '}
				<a className="link" href={ME_GITHUB_URL}>
					GitHub
				</a>
				.
			</p>
		</section>
	);
}

function Photography() {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">
				I make photos of trees, buildings, and things
			</h2>
			<div className="expander">
				<img
					src="/images/photos-1.avif"
					alt="Saxon Switzerland forest, Germany"
					width={900}
					height={505}
					className="image"
					loading="lazy"
				/>
			</div>
			<div className="expander">
				<div className="grid-auto-narrow grid gap-4">
					<img
						src="/images/photos-2.avif"
						alt="Dawn in Berlin, Germany"
						width={600}
						height={840}
						className="image"
						loading="lazy"
					/>
					<div
						className="
        hidden
        md:block
      "
					>
						<img
							src="/images/photos-3.avif"
							alt="Foggy Berliner Dom, Germany"
							width={600}
							height={840}
							className="image"
							loading="lazy"
						/>
					</div>
					<img
						src="/images/photos-4.avif"
						alt="Sunrise in Rome, Italy"
						width={600}
						height={840}
						className="image"
						loading="lazy"
					/>
				</div>
			</div>
			<p className="typo-body">
				See{' '}
				<a className="link" href="https://morning.photos/">
					more of my photos and my photography zine
				</a>
				.
			</p>
		</section>
	);
}

function Coffee() {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">I drink lots of coffee</h2>
			<div className="expander">
				<div className="grid-auto-narrow grid gap-4">
					<div
						className="
        hidden
        md:block
      "
					>
						<img
							src="/images/coffee-1.avif"
							alt="Coffee"
							width={600}
							height={750}
							className="image"
							loading="lazy"
						/>
					</div>
					<img
						src="/images/coffee-2.avif"
						alt="Coffee"
						width={600}
						height={750}
						className="image"
						loading="lazy"
					/>
					<img
						src="/images/coffee-3.avif"
						alt="Coffee"
						width={600}
						height={750}
						className="image"
						loading="lazy"
					/>
				</div>
			</div>
			<p className="typo-body">
				No milk, no sugar, preferably filter.{' '}
				<del>Dark and bitter, like life.</del> Check out my pour over{' '}
				<a className="link" href="https://coffee.morning.photos/">
					coffee timer
				</a>
				.
			</p>
		</section>
	);
}

function Cooking() {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">I learn how to cook great food</h2>
			<div className="expander">
				<div className="grid-auto-narrow grid gap-4">
					<a
						className="link"
						href="https://tacohuaco.co/recipes/tres-leches-cake/"
					>
						<img
							src="/images/food-1.avif"
							alt="Tres leches cake"
							width={750}
							height={563}
							className="image"
							loading="lazy"
						/>
					</a>
					<div
						className="
        hidden
        md:block
      "
					>
						<a className="link" href="https://tacohuaco.co/recipes/svekolnik/">
							<img
								src="/images/food-2.avif"
								alt="Svekolnik (cold borscht)"
								width={750}
								height={563}
								className="image"
								loading="lazy"
							/>
						</a>
					</div>
					<a
						className="link"
						href="https://tacohuaco.co/recipes/cottage-cheesecake/"
					>
						<img
							src="/images/food-3.avif"
							alt="Cottage cheesecake"
							width={750}
							height={563}
							className="image"
							loading="lazy"
						/>
					</a>
				</div>
			</div>
			<p className="typo-body">
				My favorite cuisines to cook are Russian, Mexican, Korean, and Italian;
				my fiancée and I are{' '}
				<a className="link" href="https://tacohuaco.co/">
					collecting recipes
				</a>
				.
			</p>
		</section>
	);
}

function Me() {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">I may (or may not) look like this</h2>
			<div className="expander">
				<div className="grid-auto-narrow grid gap-4">
					<img
						src="/images/me-1.avif"
						alt="Artem Sapegin is making some photos"
						width={700}
						height={700}
						className="image"
						loading="lazy"
					/>
					<div
						className="
        hidden
        md:block
      "
					>
						<img
							src="/images/me-2.avif"
							alt="Artem Sapegin is drinking coffee"
							width={700}
							height={700}
							className="image"
							loading="lazy"
						/>
					</div>
					<img
						src="/images/me-3.avif"
						alt="Artem Sapegin is making some photos"
						width={700}
						height={700}
						className="image"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	);
}

function Leather() {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="heading-2">I make things from leather</h2>
			<div className="expander">
				<img
					src="/images/leathercraft.avif"
					alt="Leather goods I have made"
					width={1512}
					height={1008}
					className="image"
					loading="lazy"
				/>
			</div>
			<p className="typo-body">
				Check out my digital leather patterns{' '}
				<a className="link" href="https://klatzleathergoods.etsy.com/">
					on Etsy
				</a>
				.
			</p>
		</section>
	);
}

function BestViewed() {
	return (
		<section className="flex flex-col gap-2 text-center">
			<p className="typo-body">This page is best viewed in:</p>
			<img
				className="mx-auto"
				src="/images/netscape.gif"
				alt="Netscape Navigator"
				title="Netscape Navigator"
				width={60}
				height={60}
				loading="lazy"
			/>
		</section>
	);
}

export function MainPage({ url, blogPosts, books, writing, projects }: Props) {
	return (
		<Page url={url}>
			<Intro />
			<Writing books={books} writing={writing} blogPosts={blogPosts} />
			<Projects projects={projects} />
			<Photography />
			<Cooking />
			<Leather />
			<Coffee />
			<Me />
			<BestViewed />
		</Page>
	);
}
