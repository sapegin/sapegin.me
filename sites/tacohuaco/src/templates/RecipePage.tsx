import { type ReactNode } from 'react';
import { Markdown } from '../components/Markdown';
import { RecipeList } from '../components/RecipeList';
import { RecipeMeta } from '../components/RecipeMeta';
import type { Recipe, RecipeFragment } from '../types/Recipe';
import { Page } from './Page';

type Props = Recipe & {
	url: string;
	madeWithRecipes: RecipeFragment[];
	relatedRecipes: RecipeFragment[];
	children: ReactNode;
};

export function RecipePage(props: Props) {
	const {
		url,
		imageUrl,
		keywords,
		title,
		titleEnglish,
		description,
		madeWithRecipes,
		relatedRecipes,
		children,
	} = props;
	return (
		<Page url={url}>
			<main className="flex flex-col gap-16">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<h1 className="heading-1">{title}</h1>
							{titleEnglish && (
								<p className="font-body text-text italic">{titleEnglish}</p>
							)}
						</div>
						<RecipeMeta {...props} />
					</div>
					{description && (
						<div className="prose typo-intro">
							<Markdown text={description} forceBlock />
						</div>
					)}
					{keywords.length > 0 && (
						<span className="sr-only">Keywords: {keywords.join(', ')}</span>
					)}
					{imageUrl && <img src={imageUrl} alt="" />}
					{children}
					{madeWithRecipes.length > 0 && (
						<div className="flex flex-col gap-4">
							<h2 className="heading-2">Recipes with {title.toLowerCase()}</h2>
							<RecipeList recipes={madeWithRecipes} />
						</div>
					)}
				</div>
				{relatedRecipes.length > 0 && (
					<div className="flex flex-col gap-4">
						<h2 className="heading-2">
							More recipes like {title.toLowerCase()}
						</h2>
						<RecipeList recipes={relatedRecipes} />
					</div>
				)}
			</main>
		</Page>
	);
}
