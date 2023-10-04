import { Box } from '.';
import { bookCover } from './BookCover.css';

type Props = {
	title: string;
	image: string;
	width?: number;
	height?: number;
};

export function BookCover({ title, image, width = 150, height = 194 }: Props) {
	return (
		<Box className={bookCover}>
			<img
				src={`/images/covers/${image}.jpg`}
				width={width}
				height={height}
				alt={`${title} book cover`}
			/>
		</Box>
	);
}
