import _ from 'lodash';
import { FullWidth } from '../components/FullWidth';
import { Photograph } from '../components/Photograph';
import { Stack } from '../components/Stack';
import { type Photo } from '../types/Photo';
import { PageWithTitle } from './PageWithTitle';
import { Markdown } from '../components/Markdown';
import { TextContent } from '../components/TextContent';
import { Grid } from '../components/Grid';
import { Support } from '../components/Support';

type Props = {
	url: string;
	title: string;
	description?: string;
	photos: Photo[];
};

export function AlbumPage({ url, title, description, photos }: Props) {
	// Group by aspect ratio, but keep all horizontal photos in a single group
	const photosByAspectRatio = _.groupBy(photos, (x) => {
		const aspectRatio = x.width / x.height;
		return aspectRatio < 1 ? aspectRatio : 0;
	});

	// Split each group of vertical photos into pairs
	const photoPairs = Object.entries(photosByAspectRatio).flatMap(
		([aspectRatio, images]) => {
			return _.chunk(images, aspectRatio === '0' ? 1 : 2);
		}
	);

	// Sort by the date of the first photo in the pair
	const sortedPhotos = _.orderBy(photoPairs, [(x) => x[0].timestamp], ['desc']);

	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap={{ base: 'l', desktop: 'xl' }}>
				{description && (
					<TextContent>
						<Markdown text={description} forceBlock />
					</TextContent>
				)}
				<FullWidth>
					<Stack gap={{ base: 'xl', desktop: 'xxl' }}>
						{sortedPhotos.map((pair) => (
							<Grid
								key={pair[0].name}
								id={pair[0].name}
								rowGap="xl"
								columnGap="m"
								alignItems="center"
								justifyItems="center"
								gridTemplateColumns={{
									base: '1fr',
									tablet: 'repeat(auto-fit, minmax(320px,1fr))',
								}}
								height={{
									base: 'auto',
									tablet: 'min(900px, calc(100vh - (token(spacing.m) * 2)))',
								}}
								margin={{
									base: 0,
									tablet: 'm',
								}}
							>
								{pair.map((photo, index) => (
									<Photograph
										key={photo.name}
										id={index > 0 ? photo.name : undefined}
										photo={photo}
									/>
								))}
							</Grid>
						))}
					</Stack>
				</FullWidth>
				<Support />
			</Stack>
		</PageWithTitle>
	);
}
