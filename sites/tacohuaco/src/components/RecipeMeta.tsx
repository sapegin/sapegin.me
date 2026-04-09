import type { RecipeFragment } from '../types/Recipe';
import { RecipeCuisines } from './RecipeCuisines';
import { RecipeFlags } from './RecipeFlags';
import { RecipeTags } from './RecipeTags';
import { RecipeTimes } from './RecipeTimes';

type Props = RecipeFragment;

export function RecipeMeta({
	cuisines,
	tags,
	time,
	overnight,
	...flags
}: Props) {
	return (
		<div className="flex flex-col gap-3">
			<div className="
     flex flex-col items-start gap-3
     lg:flex-row lg:items-center
   ">
				<RecipeFlags {...flags} />
				{time && <RecipeTimes time={time} overnight={overnight} />}
			</div>
			{(cuisines.length > 0 || tags.length > 0) && (
				<RecipeTags tags={tags}>
					{cuisines.length > 0 && <RecipeCuisines cuisines={cuisines} />}
				</RecipeTags>
			)}
		</div>
	);
}
