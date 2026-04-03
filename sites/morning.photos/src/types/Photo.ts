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
