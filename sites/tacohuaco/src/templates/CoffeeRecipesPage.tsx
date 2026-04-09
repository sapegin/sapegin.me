import { CoffeeRecipeCard } from '../components/CoffeeRecipeCard';
import { PageWithTitle } from './PageWithTitle';
import { type CoffeeRecipe as CoffeeRecipeType } from '../util/cafe/types';
import { TextTypo } from '../components/TextTypo';

type Props = {
	url: string;
	title: string;
	coffeeRecipes: CoffeeRecipeType[];
};

export function CoffeeRecipesPage({ url, title, coffeeRecipes }: Props) {
	return (
		<PageWithTitle
			url={url}
			title={title}
			extraFooter={
				<>
					Coffee icons by{' '}
					<a className="link" href="https://thenounproject.com/creator/yusufmahfudin732/">Mahfudin yusuf</a>,{' '}
					<a className="link" href="https://thenounproject.com/creator/gulalicon/">Gulalicon</a> and{' '}
					<a className="link" href="https://thenounproject.com/creator/seren.crea/">Serena</a>.
				</>
			}
		>
			<div className="flex flex-col gap-8">
				<TextTypo variant="intro">How we make coffee at home and while traveling.</TextTypo>
				{coffeeRecipes.map((recipe) => <CoffeeRecipeCard key={recipe.name} recipe={recipe} />)}
			</div>
		</PageWithTitle>
	);
}
