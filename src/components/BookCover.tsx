import { Image } from './Image';

interface Props {
	title: string;
	image: string;
	width?: number;
	height?: number;
}

export function BookCover({ title, image, width = 150, height = 194 }: Props) {
	return (
		<div className="book book-cover">
			<Image
				src={`/images/covers/${image}.avif`}
				width={width}
				height={height}
				alt={`${title} book cover`}
			/>
		</div>
	);
}
