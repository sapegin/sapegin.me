import _ from 'lodash';
import Group from 'react-group';
import {
	About,
	Badge,
	Box,
	Button,
	CodeSpread,
	CodeSpreadSupreme,
	Feedback,
	Grid,
	Heading,
	Link,
	OrderedList,
	OrderedListItem,
	SquirrelsongLogo,
	Stack,
	Text,
	TextTypo,
	VisuallyHidden,
} from '../components';
import { Page } from './Page';
import {
	instructions,
	type Instructions,
} from './SquirrelsongPageInstructions';

type Props = {
	url: string;
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
};

const sortedInstructions = _.sortBy(instructions, ({ app }) =>
	app.toLowerCase()
);

function InstallationSteps({
	id,
	app,
	light,
	dark,
	comment,
	urlLight,
	urlDark,
	urlName,
	steps,
}: Instructions) {
	return (
		<Stack as="article" id={id} gap="s">
			<Stack direction="row" gap="m" alignItems="center">
				<Heading level={3}>{app}</Heading>
				<Stack as="p" direction="row" gap="xs" alignItems="center">
					{light && <Badge>light</Badge>}
					{dark && <Badge variant="inverted">dark</Badge>}
				</Stack>
			</Stack>
			{comment && <Text variant="small">{comment}</Text>}
			{urlLight && urlDark && (
				<Text>
					Follow the instructions on {urlName}:{' '}
					<Link href={urlLight}>light theme</Link>,{' '}
					<Link href={urlDark}>dark theme</Link>
				</Text>
			)}
			{((urlLight && !urlDark) || (!urlLight && urlDark)) && (
				<Text>
					<Link href={urlLight || urlDark}>
						Follow the instructions on {urlName}
					</Link>
				</Text>
			)}
			{steps && (
				<OrderedList>
					{steps.map((step, index) => (
						<OrderedListItem key={index}>{step}</OrderedListItem>
					))}
				</OrderedList>
			)}
		</Stack>
	);
}

function Hero() {
	return (
		<Stack gap="m" alignItems="center">
			<SquirrelsongLogo />
			<Stack gap="s" alignItems="center">
				<Heading level={1}>Squirrelsong</Heading>
				<Heading level={3} as="p">
					Light &amp; dark themes for web developers
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
				<Stack gap="m">
					<TextTypo>
						Most themes have very high contrast and bright colors which makes
						them tiring for the eyes, especially for highly sensitive people.
						Squirrelsong themes are low-contrast and use soft colors, but still
						provide enough color and style variety to distinguish various
						elements of the code and avoid long chains of code printed in the
						same style.
					</TextTypo>
					<CodeSpread codes={codes} name="intro" />
				</Stack>
			</Stack>
			<Stack gap="s">
				<Heading level={3}>Made for web developers</Heading>
				<Stack gap="m">
					<TextTypo>
						Carefully crafted syntax highlighting for JavaScript, TypeScript,
						HTML, CSS, Sass, styled-components, Markdown, JSON, XML, React, and
						Astro. Also, works well with PHP, Python, Ruby, Rust, Java, Swift,
						etc.
					</TextTypo>
					<CodeSpreadSupreme codes={codes} names={['html', 'css', 'json']} />
				</Stack>
			</Stack>
			<Stack gap="s">
				<Heading level={3}>Monochrome Markdown styles</Heading>
				<Stack gap="m">
					<TextTypo>
						Inspired by iA Writer, Markdown is styled in shades of gray to avoid
						distractions while writing your next blog post, documentation, or
						book.
					</TextTypo>
				</Stack>
				<CodeSpread codes={codes} name="markdown" />
			</Stack>
			<Stack gap="s">
				<Heading level={3}>
					Consistent highlighting of different programming languages
				</Heading>
				<Stack gap="m">
					<TextTypo>
						Colors and styles are consistent among different programming
						languages: for example, <code>this</code> in TypeScript is styled
						the same way as <code>$this</code> in PHP and <code>self</code> in
						Python or Rust. HTML looks the same as JSX in React or markup in
						Astro components.
					</TextTypo>
					<CodeSpreadSupreme
						codes={codes}
						names={['typescript', 'php', 'python']}
					/>
				</Stack>
			</Stack>
			<Stack gap="s">
				<Heading level={3}>Non-distracting UI</Heading>
				<Stack gap="m">
					<TextTypo>
						Custom UI for Visual Studio Code, and other apps without
						oversaturated bright colors to keep you focused on your code instead
						of being distracted and overwhelmed. Compare it to the default
						Visual Studio Code theme.
					</TextTypo>
					<Grid auto="wide" gap="m">
						<Box objectFit="cover" overflow="hidden">
							<img
								src="/images/squirrelsong/squirrelsong-vscode.avif"
								width={593}
								height={459}
								alt="Squirrelsong light theme for Visual Studio Code"
							/>
						</Box>
						<Box objectFit="cover" overflow="hidden">
							<img
								src="/images/squirrelsong/squirrelsong-vscode-default.avif"
								width={593}
								height={459}
								alt="Default light theme for Visual Studio Code"
							/>
						</Box>
					</Grid>
				</Stack>
			</Stack>
		</Stack>
	);
}

function Installation() {
	return (
		<Stack gap="l" id="download">
			<Stack gap="s">
				<Heading level={2}>
					Get it for your editor, terminal, or&nbsp;app
				</Heading>
				<Text>
					<Group separator=", ">
						{sortedInstructions.map((app) => (
							<Link key={app.id} href={`#${app.id}`}>
								{app.app}
							</Link>
						))}
					</Group>
				</Text>
			</Stack>
			{sortedInstructions.map((app) => (
				<InstallationSteps key={app.id} {...app} />
			))}
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
					<Text variant="intro">
						A low-contrast, non-distracting, and neurodiverse-friendly theme
						that is comfortable for all-day coding without sensory
						overstimulation. It’s perfect for developers with ADHD, autism, or
						highly sensitive people (HSP).
					</Text>
					<Features codes={codes} />
					<Installation />
					<About>
						I created the first version of this theme in 2016, and since then
						use it every day at work and for personal projects. Seven years
						later, I rebuilt it almost from scratch and improved many things.
					</About>
					<Stack gap="m">
						<Heading level={2}>Have a question?</Heading>
						<Feedback github="squirrelsong" />
					</Stack>
					<Text variant="small">
						The font used in all examples and logo is{' '}
						<Link href="https://www.monolisa.dev/">MonoLisa</Link>. The icons on
						the Visual Studio Code screenshots are from the{' '}
						<Link href="https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons">
							Catppuccin Icons
						</Link>{' '}
						extension.
					</Text>
				</Stack>
			</main>
		</Page>
	);
}
