import { Box, Image } from '.';

type Props = {
	title: string;
	image: string;
	width?: number;
	height?: number;
};

const colors = {
	shadow: 'rgba(0, 0, 0, 0.25)',
	outlineLight: 'rgba(255, 255, 255, 0.7)',
	outlineDark: 'rgba(0, 0, 0, 0.3)',
	insetLight: 'rgba(0, 0, 0, 0.15)',
	insetDark: 'rgba(255, 255, 255, 0.5)',
};

export function BookCover({ title, image, width = 150, height = 194 }: Props) {
	return (
		<Box
			css={{
				position: 'relative',
				boxShadow: `0 10px 20px ${colors.shadow}`,
				borderRadius: 3,
				borderStyle: 'solid',
				borderWidth: 1,
				borderColor: `${colors.outlineLight} ${colors.outlineDark} ${colors.outlineDark} ${colors.outlineLight}`,
				_before: {
					content: `''`,
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 10,
					borderLeft: `1px solid ${colors.insetLight}`,
				},
				_after: {
					content: `''`,
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 11,
					borderLeft: `1px solid ${colors.insetDark}`,
				},
			}}
		>
			<Image
				src={`/images/covers/${image}.avif`}
				width={width}
				height={height}
				alt={`${title} book cover`}
				m={0}
			/>
		</Box>
	);
}
