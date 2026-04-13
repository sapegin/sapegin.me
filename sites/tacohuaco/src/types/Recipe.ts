export interface RecipeFragment {
	createdAt: Date;
	keywords: string[];
	overnight: boolean;
	slug: string;
	tags: string[];
	thumbnailUrl?: string;
	time?: string;
	title: string;
	titleEnglish?: string;
}

export interface Recipe extends RecipeFragment {
	description?: string;
	imageUrl?: string;
	ingredients: string;
	notes?: string;
	source?: string;
	steps: string;
	tools?: string;
	usedBy: string[];
	yields?: string;
}

export type RecipeRaw = Omit<Recipe, 'createdAt'> & {
	createdAt: string;
};
