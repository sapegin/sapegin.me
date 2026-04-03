import { FullWidth } from '../components/FullWidth';
import { PageWithTitle } from './PageWithTitle';
import { Heading } from '../components/Heading';
import { QuotedLink } from '../components/QuotedLink';
import type { Photo } from '../types/Photo';
import { Grid } from '../components/Grid';
import { Thumbnail } from '../components/Thumbnail';
import { Frame } from '../components/Frame';

export type AlbumTeaser = {
	url: string;
	title: string;
	cover?: Photo;
};

type Props = {
	url: string;
	title: string;
	albums: AlbumTeaser[];
};

export function AlbumsPage({ url, title, albums }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<FullWidth>
				<Grid auto="wide" columnGap="l" rowGap={{ base: 'l', desktop: 'xl' }}>
					{albums.map((album) => (
						<QuotedLink key={album.url} mb="l" href={album.url}>
							{album.cover && (
								<Frame aspectRatio="9/6">
									<Thumbnail photo={album.cover} />
								</Frame>
							)}
							<Heading level={3} as="h2" mt="s" mx={{ base: 'm', desktop: 0 }}>
								<u>{album.title}</u>
							</Heading>
						</QuotedLink>
					))}
				</Grid>
			</FullWidth>
		</PageWithTitle>
	);
}
