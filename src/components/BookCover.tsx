import { Box } from '.';
import { bookCover } from './BookCover.css';

const TITLES = {
	'washing-your-code': 'Washing your code',
	'survivejs-maintenance': 'SurviveJS: Maintenance',
};

type Props = {
	book: 'washing-your-code' | 'survivejs-maintenance';
	variant?: 'small' | 'large';
};

export function BookCover({ book, variant = 'small' }: Props) {
	return (
		<Box className={bookCover}>
			<img
				src={`/images/${book}-cover-${variant}.webp`}
				width={variant === 'large' ? 250 : 150}
				height={variant === 'large' ? 324 : 194}
				alt={`${TITLES[book]} book cover`}
			/>
		</Box>
	);
}
