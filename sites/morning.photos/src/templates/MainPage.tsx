import { VisuallyHidden } from '../components/VisuallyHidden';
import { Box } from '../components/Box';
import { Expander } from '../components/Expander';
import { Frame } from '../components/Frame';
import { Grid } from '../components/Grid';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { Markdown } from '../components/Markdown';
import { Stack } from '../components/Stack';
import { TextContent } from '../components/TextContent';
import { Thumbnail } from '../components/Thumbnail';
import type { Photo } from '../types/Photo';
import type { Resource } from '../types/Resource';
import { Page } from './Page';
import { Support } from '../components/Support';

type Props = {
	url: string;
	title: string;
	text: string;
	photos: Photo[];
	links: Resource[][];
};

function findPhoto(photos: Photo[], name: string) {
	return photos.find((x) => x.name === name);
}

function Links({ links }: Pick<Props, 'links'>) {
	return (
		<ul>
			{links.map((group) =>
				group.map(({ url, title }, index) => (
					<Box
						key={url}
						as="li"
						mb={index === group.length - 1 ? 'm' : undefined}
					>
						<Link href={url}>{title}</Link>
					</Box>
				))
			)}
		</ul>
	);
}

function Photos({ photos }: Pick<Props, 'photos'>) {
	const photo1 = findPhoto(photos, '2021-11-06_8253_Artem_Sapegin');
	const photo2 = findPhoto(photos, '2021-03-08_1475_Artem_Sapegin');
	const photo3 = findPhoto(photos, '2021-02-07_8254_Artem_Sapegin');
	const photo4 = findPhoto(photos, '2021-07-30_4525_Artem_Sapegin');
	return (
		<Stack as="section" gap="m">
			{photo1 && (
				<Expander>
					<Link href={`/photos/#${photo1.name}`} display="block">
						<Thumbnail
							photo={photo1}
							size="full"
							alt="Saxon Switzerland forest, Germany"
						/>
					</Link>
				</Expander>
			)}
			<Expander>
				<Grid gap="m" auto="narrow">
					{photo2 && (
						<Link href={`/photos/#${photo2.name}`} display="block">
							<Frame aspectRatio="65/90">
								<Thumbnail photo={photo2} alt="Dawn in Berlin, Germany" />
							</Frame>
						</Link>
					)}
					<Box display={{ base: 'none', tablet: 'block' }}>
						{photo3 && (
							<Link href={`/photos/#${photo3.name}`} display="block">
								<Frame aspectRatio="65/90">
									<Thumbnail
										photo={photo3}
										alt="Snowstorm in Berlin, Germany"
									/>
								</Frame>
							</Link>
						)}
					</Box>
					{photo4 && (
						<Link href={`/photos/#${photo4.name}`} display="block">
							<Frame aspectRatio="65/90">
								<Thumbnail photo={photo4} alt="Sunrise in Rome, Italy" />
							</Frame>
						</Link>
					)}
				</Grid>
			</Expander>
		</Stack>
	);
}

function Photos2({ photos }: Pick<Props, 'photos'>) {
	const photo1 = findPhoto(photos, 'IMG_7743');
	const photo2 = findPhoto(photos, 'IMG_5445');
	const photo3 = findPhoto(photos, 'IMG_8108');
	const photo4 = findPhoto(photos, '2023-12-30_1325_Artem_Sapegin');
	return (
		<Stack as="section" gap="m">
			<Me />
			{photo4 && (
				<Expander>
					<Link href={`/photos/#${photo4.name}`} display="block">
						<Thumbnail
							photo={photo4}
							size="full"
							alt="Mall near Valencia, Spain"
						/>
					</Link>
				</Expander>
			)}
			<Expander>
				<Grid gap="m" auto="narrow">
					{photo1 && (
						<Link href={`/series/gol/#${photo1.name}`} display="block">
							<Frame aspectRatio="65/90">
								<Thumbnail
									photo={photo1}
									alt="View from the top floor of Pressehaus, Berlin, Germany"
								/>
							</Frame>
						</Link>
					)}
					<Box display={{ base: 'none', tablet: 'block' }}>
						{photo2 && (
							<Link href={`/series/moire/#${photo2.name}`} display="block">
								<Frame aspectRatio="65/90">
									<Thumbnail
										photo={photo2}
										alt="Peeled advertisement posters, Berlin, Germany"
									/>
								</Frame>
							</Link>
						)}
					</Box>
					{photo3 && (
						<Link href={`/series/sfop/#${photo3.name}`} display="block">
							<Frame aspectRatio="65/90">
								<Thumbnail
									photo={photo3}
									alt="Birds chasing an airplane, Berlin, Germany"
								/>
							</Frame>
						</Link>
					)}
				</Grid>
			</Expander>
		</Stack>
	);
}

function Me() {
	return (
		<Expander>
			<Grid gap="m" auto="narrow">
				<Image
					src="/images/about/me-1.avif"
					alt="Artem Sapegin is making a photo with a toy camera"
					width={700}
					height={700}
					style={{ backgroundColor: '#69716e' }}
				/>
				<Box display={{ base: 'none', tablet: 'block' }}>
					<Image
						src="/images/about/me-2.avif"
						alt="Artem Sapegin is making a photo with a phone"
						width={700}
						height={700}
						style={{ backgroundColor: '#978b7f' }}
					/>
				</Box>
				<Image
					src="/images/about/me-3.avif"
					alt="Artem Sapegin is making a photo in a forest"
					width={700}
					height={700}
					style={{ backgroundColor: '#615c45' }}
				/>
			</Grid>
		</Expander>
	);
}

export function MainPage({ url, title, text, photos, links }: Props) {
	return (
		<Page url={url}>
			<Stack gap="xl">
				<VisuallyHidden as="h1">{title}</VisuallyHidden>
				<Photos photos={photos} />
				<Stack gap="l">
					<Grid
						gridColumnGap="l"
						gridTemplateColumns={{ base: '1fr', desktop: '2fr 1fr' }}
					>
						<TextContent>
							<Markdown text={text} />
						</TextContent>
						<Links links={links} />
					</Grid>
					<Photos2 photos={photos} />
					<TextContent>
						Have a look at my <Link href="/photos/">photo portfolio</Link>,{' '}
						<Link href="/photos/">series</Link>,{' '}
						<Link href="/photos/">my photography zine</Link>. Subscribe to{' '}
						<Link href="https://lofisunshine.substack.com/">my Substack</Link>{' '}
						or{' '}
						<Link href="https://buymeacoffee.com/sapegin">
							buy me a cup of coffee
						</Link>
						.
					</TextContent>
					<Support />
				</Stack>
			</Stack>
		</Page>
	);
}
