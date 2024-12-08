import { Flex } from '../components/Flex';
import { FullWidth } from '../components/FullWidth';
import { Photo } from '../components/Photo';
import { Stack } from '../components/Stack';
import { type Image } from '../types/Image';
import { getPhotoId } from '../util/getPhotoId';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
	photos: Image[][];
};

export function GalleryPage({ url, title, photos }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<FullWidth>
				<Stack gap={{ base: 'xl', desktop: 'xxl' }}>
					{photos.map((pair) =>
						pair.length === 1 ? (
							<Flex
								key={pair[0].url}
								id={getPhotoId(pair[0].url)}
								justifyContent="center"
							>
								<Photo
									src={pair[0].url}
									width={pair[0].width}
									height={pair[0].height}
									alt=""
								/>
							</Flex>
						) : (
							<Stack
								key={pair[0].url}
								direction={{ base: 'column', tablet: 'row' }}
								gap={{ base: 'xl', tablet: 'm' }}
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
						)
					)}
				</Stack>
			</FullWidth>
		</PageWithTitle>
	);
}
