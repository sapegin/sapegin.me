import {
	Stack,
	Heading,
	Text,
	VisuallyHidden,
	Button,
	Feedback,
	CodeSpread,
	CodeSpreadSupreme,
	SquirelsongLogo,
	About,
	Link,
	OrderedList,
	OrderedListItem,
} from '../components';
import { Page } from './Page';

type Props = {
	url: string;
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
};

function Hero() {
	return (
		<Stack gap="m" alignItems="center">
			<SquirelsongLogo />
			<Stack gap="s" alignItems="center">
				<Heading level={1}>Squirrelsong</Heading>
				<Heading level={3} as="p">
					A light &amp; dark theme for web developers
				</Heading>
			</Stack>
			<Button as="a" variant="large" href="#download">
				Get it now!
			</Button>
		</Stack>
	);
}

function Features({ codes }: Pick<Props, 'codes'>) {
	return (
		<Stack gap="l">
			<VisuallyHidden as="h2">Features</VisuallyHidden>
			<Stack gap="s">
				<Heading level={3}>Low contrast with great readability</Heading>
				<Text>
					Most themes, especially dark ones, have very high contrast which makes
					them tiring for the eyes. Squirrelsong themes are low contrast but
					still provide enough color difference to distinguish various elements
					in the code, and avoid long chains of code printed in the same style.
				</Text>
				<CodeSpread codes={codes} name="intro" />
			</Stack>
			<Stack gap="s">
				<Heading level={3}>Made for web developers</Heading>
				<Text>
					Carefully crafted syntax highlighting for JavaScript, TypeScript,
					HTML, CSS, Sass, Markdown, JSON, XML, React, and Astro. Also, works
					well with PHP, Python, Ruby, Rust, Java, Swift, etc.
				</Text>
				<CodeSpreadSupreme codes={codes} names={['html', 'css', 'json']} />
			</Stack>
			<Stack gap="s">
				<Heading level={3}>Monochrome Markdown styles</Heading>
				<Text>
					Inspired by iA Writer monochrome Markdown styles to avoid distractions
					while writing your next blog post, documentation, or a book.
				</Text>
				<CodeSpread codes={codes} name="markdown" />
			</Stack>
			<Stack gap="s">
				<Heading level={3}>
					Consistent highlighting for different programming languages
				</Heading>
				<Text>
					Colors are consistent among different programming languages: for
					example, <code>this</code> in TypeScript is styled the same way as{' '}
					<code>$this</code> in PHP and <code>self</code> in Python or Rust.
					HTML looks the same as JSX in React or markup in Astro components.
				</Text>
				<CodeSpreadSupreme
					codes={codes}
					names={['typescript', 'php', 'python']}
				/>
			</Stack>
			<Stack gap="s">
				<Heading level={3}>Non-distracing UI</Heading>
				<Text>
					Custom UI for Visual Studio Code and JetBrains: no oversaturated
					bright colors to keep you focused on your code.
				</Text>
				<CodeSpread codes={codes} name="markdown" />
			</Stack>
		</Stack>
	);
}

// TODO: Sublime Text
// TODO: Terminal app
// TODO: iTerm
// TODO: Alfred
// TODO: Slack
// TODO: Chrome
// TODO: DevTools
// TODO: Telegram
// TODO: Mark light / dark only themes (with icons?)
function Installation() {
	return (
		<Stack gap="m" id="download">
			<Heading level={2}>Get it for your editor</Heading>
			<Stack gap="s">
				<Heading level={3}>Visual Studio Code</Heading>
				<OrderedList>
					<OrderedListItem>
						Open <strong>View → Command Palette</strong> or press{' '}
						<strong>Cmd+Shift+P</strong>
					</OrderedListItem>
					<OrderedListItem>
						Choose <strong>Install Extension</strong>
					</OrderedListItem>
					<OrderedListItem>
						Type{' '}
						<Link href="https://marketplace.visualstudio.com/items?itemName=sapegin.Theme-SquirrelsongLight">
							Squirrelsong Light
						</Link>{' '}
						or{' '}
						<Link href="https://marketplace.visualstudio.com/items?itemName=sapegin.Theme-SquirrelsongDark">
							Squirrelsong Dark
						</Link>
					</OrderedListItem>
					<OrderedListItem>Select it or press Enter to install</OrderedListItem>
				</OrderedList>
			</Stack>
			<Stack gap="s">
				<Heading level={3}>JetBrains</Heading>
				<Text>
					Works in all JetBrains IDEs: IDEA, PhpStorm, PyCharm, RubyMine,
					WebStorm, etc.
				</Text>
				<OrderedList>
					<OrderedListItem>
						Open <strong>Settings</strong>
					</OrderedListItem>
					<OrderedListItem>
						Choose <strong>Plugins</strong>, then <strong>Marketplace</strong>
					</OrderedListItem>
					<OrderedListItem>
						Type{' '}
						<Link href="https://plugins.jetbrains.com/plugin/22568-squirrelsong-light-theme">
							Squirrelsong Light
						</Link>
					</OrderedListItem>
					<OrderedListItem>
						Press <strong>Install</strong>
					</OrderedListItem>
					<OrderedListItem>
						Open <strong>Settings</strong>, choose <strong>Squirrelsong</strong>{' '}
						in <strong>Appearance &amp; Behavior → Appearance → Theme</strong>{' '}
						and <strong>Editor → Color Scheme → Scheme</strong>
					</OrderedListItem>
				</OrderedList>
			</Stack>
			<Text>
				If something is missing or broken, feel free to{' '}
				<Link href="https://github.com/sapegin/squirrelsong">
					send me a pull request on GitHub
				</Link>
				.
			</Text>
		</Stack>
	);
}

export function SquirrelsongPage({ url, codes }: Props) {
	return (
		<Page url={url}>
			<main>
				<Stack gap="l">
					<Hero />
					<Features codes={codes} />
					<Installation />
					<About>
						I created the first version of this theme in 2016, and since then
						use it every day at work and for pesonal projects. Seven years
						later, I rebuild it almost from scratch and improved many things.
					</About>
					<Stack gap="m">
						<Heading level={2}>Have a question?</Heading>
						<Feedback github="squirrelsong" />
					</Stack>
					<Text variant="small">
						The font used in all examples is{' '}
						<Link href="https://www.monolisa.dev/">MonoLisa</Link>.
					</Text>
				</Stack>
			</main>
		</Page>
	);
}
