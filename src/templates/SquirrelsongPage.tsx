import { About } from '../components/About';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { BuyMeCoffee } from '../components/BuyMeCoffee';
import { CodeSpread } from '../components/CodeSpread';
import { CodeSpreadSupreme } from '../components/CodeSpreadSupreme';
import { Feedback } from '../components/Feedback';
import { MurderOfCrows } from '../components/MurderOfCrows';
import { SquirrelsongLogo } from '../components/SquirrelsongLogo';
import { Typo } from '../components/Typo';
import type { Squirrel } from '../types/Squirrel';
import { Page } from './Page';

interface Props {
	url: string;
	squirrels: Squirrel[];
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
}

function Hero() {
	return (
		<div className="flex flex-col items-center gap-4">
			<SquirrelsongLogo />
			<div className="flex flex-col items-center gap-2">
				<h1 className="heading-1">Squirrelsong</h1>
				<p className="heading-3">Light &amp; dark themes for web developers</p>
			</div>
			<Button as="a" variant="large" href="#download">
				Get it now!
			</Button>
		</div>
	);
}

function Features({ codes }: Pick<Props, 'codes'>) {
	return (
		<div className="flex flex-col gap-8">
			<h2 className="sr-only">Features</h2>
			<div className="flex flex-col gap-2">
				<h3 className="heading-3">Low contrast with great readability</h3>
				<div className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							Most themes have very high contrast and bright colors, which makes
							them tiring for the eyes. Squirrelsong themes are low-contrast and
							use soft colors, but still provide enough color and style variety
							to distinguish various elements of the code and avoid long chains
							of code printed in the same style.
						</Typo>
					</p>
					<CodeSpread codes={codes} name="intro" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="heading-3">Neurodiverse-friendly</h3>
				<div className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							Soft colors and low contrast are beneficial for neurodiverse
							people, such as those with attention-deficit/hyperactivity
							disorder (ADHD), autism, or high sensitivity (HSP). Such colors
							help reduce sensory overload and create a calming environment;
							they reduce distractions and visual clutter, so it’s easier to
							stay focused on your code instead of being distracted and
							overwhelmed by bright colors.
						</Typo>
					</p>
					<div className="grid-auto-wide grid gap-4">
						<figure className="flex flex-col gap-2">
							<div className="overflow-hidden object-cover">
								<img
									src="/images/squirrelsong/squirrelsong-vscode.avif"
									width={593}
									height={459}
									alt="Squirrelsong light theme for Visual Studio Code"
									loading="lazy"
									className="rounded-tl-[10px]"
								/>
							</div>
							<figcaption className="typo-small">
								Squirrelsong Light theme
							</figcaption>
						</figure>
						<figure className="flex flex-col gap-2">
							<div className="overflow-hidden object-cover">
								<img
									src="/images/squirrelsong/squirrelsong-vscode-default.avif"
									width={593}
									height={459}
									alt="Default light theme for Visual Studio Code"
									loading="lazy"
									className="rounded-tl-[10px]"
								/>
							</div>
							<figcaption className="typo-small">
								Default Visual Studio Code theme
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="heading-3">Made for web developers</h3>
				<div className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							Carefully crafted syntax highlighting for JavaScript, TypeScript,
							HTML, CSS, Sass, styled-components, Markdown, JSON, XML, React,
							and Astro. Also, it works well with PHP, Python, Ruby, Rust, Java,
							Swift, etc.
						</Typo>
					</p>
					<CodeSpreadSupreme codes={codes} names={['html', 'css', 'json']} />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="heading-3">Monochrome Markdown styles</h3>
				<div className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							Inspired by iA Writer, Markdown is styled in shades of gray to
							avoid distractions while writing your next blog post,
							documentation, or book.
						</Typo>
					</p>
				</div>
				<CodeSpread codes={codes} name="markdown" />
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="heading-3">
					Consistent highlighting of different programming languages
				</h3>
				<div className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							Colors and styles are consistent among different programming
							languages: for example, <code>this</code> in TypeScript is styled
							the same way as <code>$this</code> in PHP and <code>self</code> in
							Python or Rust. HTML looks the same as JSX in React or markup in
							Astro components.
						</Typo>
					</p>
					<CodeSpreadSupreme
						codes={codes}
						names={['typescript', 'php', 'python']}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="heading-3">UI themes for many apps</h3>
				<div className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							From your favorite code editor and terminal to Slack and Google
							Chrome. No trendy bright colors, no distractions.
						</Typo>
					</p>
					<div className="grid-auto-wide grid gap-4">
						<figure className="flex flex-col gap-2">
							<div className="overflow-hidden object-cover">
								<img
									src="/images/squirrelsong/squirrelsong-chrome.avif"
									width={699}
									height={446}
									alt="Squirrelsong light theme for for Chrome"
									loading="lazy"
									className="rounded-tl-[12px] rounded-bl-[12px]"
								/>
							</div>
							<figcaption className="typo-small">
								Squirrelsong Light for Chrome
							</figcaption>
						</figure>
						<figure className="flex flex-col gap-2">
							<div className="overflow-hidden object-cover">
								<img
									src="/images/squirrelsong/squirrelsong-alfred.avif"
									width={559}
									height={446}
									alt="Squirrelsong Light for Alfred"
									loading="lazy"
									className="rounded-tl-[6px]"
								/>
							</div>
							<figcaption className="typo-small">
								Squirrelsong Light for Alfred
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</div>
	);
}

function InstallationLink({ app, url, light, dark }: Squirrel) {
	return (
		<div className="flex flex-col gap-1">
			<p className="typo-semilarge">
				<a className="link" href={url}>
					{app}
				</a>
			</p>
			<p className="flex items-center gap-1">
				{light && <Badge>Light</Badge>}
				{dark && <Badge variant="inverted">Dark</Badge>}
			</p>
		</div>
	);
}

function Installation({ squirrels }: Pick<Props, 'squirrels'>) {
	return (
		<div className="flex flex-col gap-8" id="download">
			<div className="flex flex-col gap-2">
				<h2 className="heading-2">
					Get it for your editor, terminal, or&nbsp;app
				</h2>
				<p className="typo-body">
					Themes for {squirrels.length} apps and growing.
				</p>
			</div>
			<div
				className="
      grid grid-cols-1 gap-4
      md:grid-cols-2
      lg:grid-cols-3
    "
			>
				{squirrels.map((app) => (
					<InstallationLink key={app.url} {...app} />
				))}
			</div>
		</div>
	);
}

export function SquirrelsongPage({ url, squirrels, codes }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-8">
					<Hero />
					<p className="typo-intro">
						A low-contrast, non-distracting, and neurodiverse-friendly theme
						that is comfortable for all-day coding without sensory overload.
					</p>
				</div>
				<Features codes={codes} />
				<Installation squirrels={squirrels} />
				<About>
					I created the first version of this theme in 2016, and since then use
					it every day at work and for personal projects. Seven years later, I
					rebuilt it almost from scratch and improved many things.
				</About>
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">Have a question?</h2>
					<Feedback github="squirrelsong" />
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">Like the theme?</h2>
					<BuyMeCoffee />
				</div>
				<MurderOfCrows />
				<p className="typo-small">
					The font used in all examples and logo is{' '}
					<a className="link" href="https://www.monolisa.dev/">
						MonoLisa
					</a>
					. The icons on the Visual Studio Code screenshots are from the{' '}
					<a
						className="link"
						href="https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons"
					>
						Catppuccin&nbsp;Icons
					</a>{' '}
					extension. The gradient new tab page in the Chrome screenshot is from
					the{' '}
					<a
						className="link"
						href="https://chromewebstore.google.com/detail/blank-sky-new-tab-page/bafoejhfmmcjdjlkihjbgcmifcinomaj"
					>
						Blank&nbsp;Sky
					</a>{' '}
					extension.
				</p>
			</div>
		</Page>
	);
}
