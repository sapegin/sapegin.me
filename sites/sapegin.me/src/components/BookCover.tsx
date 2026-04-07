interface Props {
	title: string;
	image: string;
	width?: number;
	height?: number;
}

// TODO: Should we set empty alt?

export function BookCover({ title, image, width = 150, height = 194 }: Props) {
	return (
		<div className="book book-cover">
			<img
				src={`/images/covers/${image}.avif`}
				width={width}
				height={height}
				alt={`${title} book cover`}
				className="image"
				loading="lazy"
			/>
		</div>
	);
}
