import type { IngredientsSection } from '../../../sites/tacohuaco/src/types/Recipe.ts';
import { analyzeOption } from '../../../sites/tacohuaco/src/util/olivier/analyze.ts';
import { normalize } from '../../../sites/tacohuaco/src/util/olivier/normalize.ts';
import { parse } from '../../../sites/tacohuaco/src/util/olivier/parse.ts';
import { IngredientKind } from '../../../sites/tacohuaco/src/util/olivier/types.ts';
import type { RecipeModelRaw } from '../types.ts';
import { getListLines } from './getListLines.ts';
import { getSubrecipeSlug } from './getSubrecipeSlug.ts';
import { mapFlags } from './mapFlags.ts';
import { mapSeasons } from './mapSeasons.ts';
import { splitBySection } from './splitBySection.ts';

// TODO: Can we unify recipe flags and ingredient flags?
// Kind vs vegan/vegetarian, hasGluten vs glutenFree

function getSubrecipeKind(flags: ReturnType<typeof mapFlags>): IngredientKind {
	if (flags.vegan) {
		return IngredientKind.Vegan;
	}

	if (flags.vegetarian) {
		return IngredientKind.Vegetarian;
	}

	// HACK: For our purposes this should be enough to have the correct flags on recipes
	return IngredientKind.Meat;
}

export function mapIngredients(
	ingredients: RecipeModelRaw['ingredients'],
	subrecipes?: RecipeModelRaw['subrecipes']
): IngredientsSection[] {
	const sections = splitBySection(ingredients);
	return sections.map(({ name, body }) => {
		const slug = getSubrecipeSlug(body);
		if (slug) {
			if (subrecipes === undefined) {
				return { name, ingredients: [] };
			}

			// Fetching subrecipe ingredients
			const subrecipe = subrecipes.find((x) => x.slug === slug);
			if (subrecipe === undefined) {
				console.error();
				console.error(
					`Subrecipe '${slug}' not found in ingredients. Either the slug is wrong, or the subrecipe isn’t attached to the main recipe.`
				);
				console.error(body);
				console.error();
				console.error(
					`Available subrecipes:`,
					subrecipes.map((x) => x.slug)
				);
				console.error();
				return { name, ingredients: [] };
			}
			return {
				name,
				ingredients: mapIngredients(subrecipe?.ingredients)[0].ingredients,
			};
		} else {
			// Parsing section ingredients
			const lines = getListLines(body);
			return {
				name,
				ingredients: lines.map((line) => {
					const normalized = normalize(parse(line));

					return normalized.map((option) => {
						const subrecipe = subrecipes?.find(
							(x) => x.title.toLowerCase() === option.name
						);

						if (subrecipe) {
							// Ingredient is a subrecipe link
							const subrecipeIngredients = mapIngredients(
								subrecipe?.ingredients
							)[0].ingredients.flat();
							const flags = mapFlags(subrecipeIngredients);
							return {
								...option,
								kind: getSubrecipeKind(flags),
								hasGluten: flags.glutenFree === false,
								hasDairy: flags.dairyFree === false,
								hasSugar: flags.noAddedSugar === false,
								seasons: mapSeasons(subrecipeIngredients),
								subrecipeSlug: subrecipe.slug,
							};
						}

						return {
							...option,
							...analyzeOption(option),
						};
					});
				}),
			};
		}
	});
}
