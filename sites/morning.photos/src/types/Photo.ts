// TODO: Can we get this type from Zod config?

export interface Photo {
	name: string;
	title: string;
	slug: string;
	caption?: string;
	location?: string;
	modified: Date;
	timestamp?: Date;
	formattedDate?: string;
	keywords: string[];
	rating: number;
	width: number;
	height: number;
	color: string;
}
