import {
	Box,
	Stack,
	Grid,
	Heading,
	Text,
	Link,
	Image,
	Expander,
} from '../components';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
};

// TODO: Add subscription form

// TODO: Text component can do typography automatically

function Intro() {
	return (
		<Stack as="section" gap="m">
			<Stack gap="m">
				<Text variant="intro">
					I love to&nbsp;make photos of&nbsp;nature, cities,{' '}
					<Link href="https://tacohuaco.co/">food</Link>, and&nbsp;sometimes
					people, or&nbsp;animals. I&nbsp;equally enjoy making quick snaps with
					my&nbsp;iPhone, and&nbsp;waiting for&nbsp;minute-long exposures with
					a&nbsp;big&nbsp;camera on&nbsp;a&nbsp;tripod. I&nbsp;love dawn
					and&nbsp;mornings, and always have my&nbsp;reusable coffee mug
					or&nbsp;a&nbsp;thermos full of&nbsp;fresh coffee with&nbsp;me.
					I&nbsp;prefer quiet colors and&nbsp;subtle editing. However,
					I&nbsp;don’t try to&nbsp;portray the world as&nbsp;it&nbsp;is,
					I’m&nbsp;more interested in&nbsp;showing the&nbsp;hidden side
					of&nbsp;the&nbsp;world&nbsp;— the&nbsp;one that’s full of&nbsp;beauty,
					magic, and with a&nbsp;unicorn hiding behind that&nbsp;tree.
				</Text>
			</Stack>
		</Stack>
	);
}

function Gallery() {
	return (
		<Stack as="section" gap="m">
			<Heading level={2}>My photography portfolio</Heading>
			<Expander>
				<Image
					src="/images/photos-1.jpg"
					alt="Saxon Switzerland forest, Germany"
					width={900}
					height={505}
				/>
			</Expander>
			<Expander>
				<Grid gap="m" auto="narrow">
					<Image
						src="/images/photos-2.jpg"
						alt="Dawn in Berlin, Germany"
						width={600}
						height={750}
					/>
					<Box display={{ mobile: 'none', tablet: 'block' }}>
						<Image
							src="/images/photos-3.jpg"
							alt="Foggy Berliner Dom, Germany"
							width={600}
							height={750}
						/>
					</Box>
					<Image
						src="/images/photos-4.jpg"
						alt="Sunrise in Rome, Italy"
						width={600}
						height={750}
					/>
				</Grid>
			</Expander>
			<Text>
				<Link href="/photos/favorites">See my favorite photos</Link>.
			</Text>
		</Stack>
	);
}

function Zine() {
	return (
		<Stack as="section" gap="m">
			<Heading level={2}>From dawn till coffee zine</Heading>
			<Expander>
				<Image
					src="/images/zine.jpg"
					alt="From dawn till coffee photography zine"
					width={1512}
					height={1134}
				/>
			</Expander>
			<Text>
				<Link href="/photos/zine">Check out my photography zine</Link>.
			</Text>
		</Stack>
	);
}

export function PhotosPage({ url, title }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack as="main" gap="l">
				<Intro />
				<Gallery />
				<Zine />
			</Stack>
		</PageWithTitle>
	);
}
