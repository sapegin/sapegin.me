import { Stack, Photo, Expander, Flex, FullWidth } from '../components';
import { PageWithTitle } from './PageWithTitle';
import { type Image } from '../types/Image';
import { getPhotoId } from '../util/getPhotoId';

type Props = {
	url: string;
	title: string;
	photos: Image[][];
};

export function GalleryPage({ url, title, photos }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<FullWidth>
				<Stack gap={{ mobile: 'xl', desktop: 'xxl' }}>
					{photos.map((pair) => (
						<Expander key={pair[0].url}>
							<Stack
								direction={{ mobile: 'column', desktop: 'row' }}
								gap={{ mobile: 'xl', desktop: 'm' }}
								justifyContent="center"
							>
								{pair.map((photo) => (
									<Flex
										key={photo.url}
										id={getPhotoId(photo.url)}
										justifyContent="center"
									>
										<Photo
											src={photo.url}
											width={photo.width}
											height={photo.height}
											alt=""
										/>
									</Flex>
								))}
							</Stack>
						</Expander>
					))}
				</Stack>
			</FullWidth>
		</PageWithTitle>
	);
}
