import type { RecipeFragment } from '../types/Recipe';
import { RecipeTags } from './RecipeTags';
import { RecipeTimes } from './RecipeTimes';

export function RecipeMeta({ tags, time, overnight }: RecipeFragment) {
	return (
		<div className="flex flex-col gap-2">
			{tags.length > 0 && <RecipeTags tags={tags} />}
			{time ? <RecipeTimes time={time} overnight={overnight} /> : null}
		</div>
	);
}
