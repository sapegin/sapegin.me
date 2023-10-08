import { Stack, Photo, Expander } from '../components';
import { PageWithTitle } from './PageWithTitle';

export type Image = {
	url: string;
	width: number;
	height: number;
};

type Props = {
	url: string;
	title: string;
	photos: Image[];
};

export function GalleryPage({ url, title, photos }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="xxl">
				{photos.map((photo) => (
					<Expander key={photo.url} textAlign="center">
						<Photo
							src={photo.url}
							width={photo.width}
							height={photo.height}
							alt=""
						/>
					</Expander>
				))}
			</Stack>
		</PageWithTitle>
	);
}
