import type { RecipeFragment } from '../types/Recipe';
import { RecipeCard } from './RecipeCard';

interface Props {
	recipes: readonly RecipeFragment[];
}

export const RecipeList = ({ recipes }: Props) => (
	<ul className="
   grid grid-cols-1 gap-x-4 gap-y-8
   md:grid-cols-2
   lg:grid-cols-3
 ">
		{recipes.map((recipe) => (
			<RecipeCard key={recipe.slug} as="li" {...recipe} />
		))}
	</ul>
);
