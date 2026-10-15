export interface RecipeFragment {
	color: string;
	createdAt: Date;
	height: number;
	keywords: string[];
	overnight: boolean;
	slug: string;
	tags: string[];
	time?: string;
	title: string;
	titleEnglish?: string;
	width: number;
}

export interface Recipe extends RecipeFragment {
	description?: string;
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
