import _ from 'lodash';
import { Markdown } from '../../../../shared/components/Markdown';
import { FullWidth } from '../components/FullWidth';
import { Photograph } from '../components/Photograph';
import { Support } from '../components/Support';
import { type Photo } from '../types/Photo';
import { PageWithTitle } from './PageWithTitle';

interface Props {
	url: string;
	title: string;
	description?: string;
	photos: Photo[];
}

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
			<div
				className="
      flex flex-col gap-8
      md:gap-16
    "
			>
				{description && (
					<div className="prose">
						<Markdown text={description} forceBlock />
					</div>
				)}
				<FullWidth>
					<div
						className="
        flex flex-col gap-16
        md:gap-32
      "
					>
						{sortedPhotos.map((pair) => (
							<div
								key={pair[0].name}
								id={pair[0].name}
								className="
          grid grid-cols-1 items-center justify-items-center gap-x-4 gap-y-16
          md:m-4 md:h-[min(900px,calc(100vh-2rem))]
          md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
        "
							>
								{pair.map((photo, index) => (
									<Photograph
										key={photo.name}
										id={index > 0 ? photo.name : undefined}
										photo={photo}
									/>
								))}
							</div>
						))}
					</div>
				</FullWidth>
				<Support />
			</div>
		</PageWithTitle>
	);
}
