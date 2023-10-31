export type ImageRaw = {
	default: {
		src: string;
		width: number;
		height: number;
		format: 'jpg';
	};
};

export type Image = {
	url: string;
	width: number;
	height: number;
};
