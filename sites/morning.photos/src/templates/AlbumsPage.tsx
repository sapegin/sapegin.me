import { FullWidth } from '../components/FullWidth';
import { Thumbnail } from '../components/Thumbnail';
import { type Photo } from '../types/Photo';
import { PageWithTitle } from './PageWithTitle';

export interface AlbumTeaser {
	url: string;
	title: string;
	cover?: Photo;
}

interface Props {
	url: string;
	title: string;
	albums: AlbumTeaser[];
}

export function AlbumsPage({ url, title, albums }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<FullWidth>
				<div
					className="grid-auto-wide grid gap-8 md:gap-y-16"
				>
					{albums.map((album) => (
						<a key={album.url} href={album.url} className="quoted-link mb-8">
							{album.cover && (
								<div className="frame aspect-9/6">
									<Thumbnail photo={album.cover} />
								</div>
							)}
							<h2
								className="heading-3 mx-2 mt-2 md:mx-0"
							>
								<u>{album.title}</u>
							</h2>
						</a>
					))}
				</div>
			</FullWidth>
		</PageWithTitle>
	);
}
