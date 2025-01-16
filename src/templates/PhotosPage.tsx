import { Box } from '../components/Box';
import { Expander } from '../components/Expander';
import { Grid } from '../components/Grid';
import { Heading } from '../components/Heading';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { Stack } from '../components/Stack';
import { Subscription } from '../components/Subscription';
import { Text } from '../components/Text';
import { TextTypo } from '../components/TextTypo';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
};

function Intro() {
	return (
		<Stack as="section" gap="m">
			<Stack gap="m">
				<TextTypo variant="intro">
					I love to make photos of nature, cities,{' '}
					<Link href="https://tacohuaco.co/">food</Link>, and sometimes people,
					or animals. I equally enjoy making quick snaps with my iPhone, and
					waiting for minute-long exposures with a big camera on a tripod. I
					love dawn and mornings, and always have my reusable coffee mug or a
					thermos full of fresh coffee with me. I prefer quiet colors and subtle
					editing. However, I don’t try to portray the world as it is, I’m more
					interested in showing the hidden side of the world — the one that’s
					full of beauty, magic, and with a unicorn hiding behind that tree.
				</TextTypo>
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
					src="/images/photos-1.avif"
					alt="Saxon Switzerland forest, Germany"
					width={900}
					height={505}
				/>
			</Expander>
			<Expander>
				<Grid gap="m" auto="narrow">
					<Image
						src="/images/photos-2.avif"
						alt="Dawn in Berlin, Germany"
						width={600}
						height={750}
					/>
					<Box display={{ base: 'none', tablet: 'block' }}>
						<Image
							src="/images/photos-3.avif"
							alt="Foggy Berliner Dom, Germany"
							width={600}
							height={750}
						/>
					</Box>
					<Image
						src="/images/photos-4.avif"
						alt="Sunrise in Rome, Italy"
						width={600}
						height={750}
					/>
				</Grid>
			</Expander>
			<Text>
				<Link href="/photos/favorites/">See my favorite photos</Link>.
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
					src="/images/zine.avif"
					alt="From dawn till coffee photography zine"
					width={1512}
					height={1134}
				/>
			</Expander>
			<Text>
				<Link href="/photos/zine/">Check out my photography zine</Link>.
			</Text>
		</Stack>
	);
}

export function PhotosPage({ url, title }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				<Intro />
				<Gallery />
				<Zine />
				<Subscription list="photo" />
			</Stack>
		</PageWithTitle>
	);
}
