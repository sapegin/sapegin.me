export interface ImageRaw {
	default: {
		src: string;
		width: number;
		height: number;
		format: 'jpg';
	};
}

export interface Image {
	url: string;
	width: number;
	height: number;
}
