import type { FlagName } from '../types/Flags';
import { RecipeFlag } from './RecipeFlag';

type RecipeFlagsProps = Record<FlagName, boolean> & { hasLinks?: boolean };

export function RecipeFlags({
	vegan,
	vegetarian,
	glutenFree,
	lowGluten,
	dairyFree,
	noAddedSugar,
	hasLinks = true,
}: RecipeFlagsProps) {
	return (
		<div className="flex flex-row gap-3">
			{vegan && <RecipeFlag type="vegan" hasLinks={hasLinks} />}
			{vegetarian && <RecipeFlag type="vegetarian" hasLinks={hasLinks} />}
			{glutenFree && <RecipeFlag type="glutenFree" hasLinks={hasLinks} />}
			{lowGluten && <RecipeFlag type="lowGluten" hasLinks={hasLinks} />}
			{dairyFree && <RecipeFlag type="dairyFree" hasLinks={hasLinks} />}
			{noAddedSugar && <RecipeFlag type="noAddedSugar" hasLinks={hasLinks} />}
		</div>
	);
}
