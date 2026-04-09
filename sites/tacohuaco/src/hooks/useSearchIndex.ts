import deburr from 'lodash/deburr';
import lunr from 'lunr';
import { useMemo } from 'react';
import type { RecipeFragment } from '../types/Recipe';
import { formatTagName } from '../util/formatTagName';
import { getAllIngredients } from '../util/getAllIngredients';
import { ALL_INGREDIENTS } from '../util/olivier/langs/en/ingredients';

const getIngredientAliases = (name: string) => {
	return ALL_INGREDIENTS.find((x) => x[0] === name) ?? [];
};

const getIngredients = (ingredients: RecipeFragment['ingredients']) => {
	const allIngredients = getAllIngredients(ingredients);
	return allIngredients.flatMap((y) =>
		getIngredientAliases(y.name).flatMap((z) => deburr(z).split(' '))
	);
};

export function useSearchIndex(recipes: readonly RecipeFragment[]) {
	return useMemo(() => {
		return lunr(function () {
			this.ref('slug');
			this.field('title', { boost: 3 });
			this.field('titleEnglish', { boost: 3 });
			this.field('cuisines');
			this.field('ingredients');
			this.field('tags');
			this.field('keywords');

			for (const {
				slug,
				title,
				titleEnglish,
				cuisines,
				ingredients,
				tags,
				keywords,
			} of recipes) {
				this.add({
					slug,
					title: deburr(title),
					titleEnglish: deburr(titleEnglish),
					cuisines,
					ingredients: getIngredients(ingredients),
					// Tags come like `awesomePizza`, we need to convert them
					// to words and then split into an array so Lunr indexes
					// them as separate words
					tags: tags.flatMap((x) => formatTagName(x).split(' ')),
					keywords,
				});
			}
		});
	}, [recipes]);
}
