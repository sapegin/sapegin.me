import { Image } from './Image';

interface Props {
	title: string;
	image: string;
	width?: number;
	height?: number;
}

// TODO: Can we reuse book-* colors here?

export function BookCover({ title, image, width = 150, height = 194 }: Props) {
	return (
		<div
			className="
     relative rounded-lg border border-solid
     before:absolute before:inset-y-0 before:left-[10px] before:border-l
     before:border-[rgba(0,0,0,0.15)] before:content-['']
     after:absolute after:inset-y-0 after:left-[11px] after:border-l
     after:border-[rgba(255,255,255,0.5)] after:content-['']
   "
			style={{
				boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
				borderColor:
					'rgba(255, 255, 255, 0.7) rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.3) rgba(255, 255, 255, 0.7)',
			}}
		>
			<Image
				src={`/images/covers/${image}.avif`}
				width={width}
				height={height}
				alt={`${title} book cover`}
			/>
		</div>
	);
}
