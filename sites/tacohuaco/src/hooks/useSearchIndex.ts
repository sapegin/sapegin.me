import deburr from 'lodash/deburr';
import lunr from 'lunr';
import { useMemo } from 'react';
import type { RecipeFragment } from '../types/Recipe';
import { formatTagName } from '../util/formatTagName';
import { getAllIngredients } from '../util/getAllIngredients';
import { Month } from '../util/olivier';
import { ALL_INGREDIENTS } from '../util/olivier/langs/en/ingredients';

export const MONTH_TO_NAME: Record<string, string> = {
	[Month.January]: 'January',
	[Month.February]: 'February',
	[Month.March]: 'March',
	[Month.April]: 'April',
	[Month.May]: 'May',
	[Month.June]: 'June',
	[Month.July]: 'July',
	[Month.August]: 'August',
	[Month.September]: 'September',
	[Month.October]: 'October',
	[Month.November]: 'November',
	[Month.December]: 'December',
};

export const SEASON_WINTER = ['winter'];
export const SEASON_SPRING = ['spring'];
export const SEASON_SUMMER = ['summer'];
export const SEASON_AUTUMN = ['autumn', 'fall'];
const MONTH_TO_SEASON: Record<string, string[]> = {
	[Month.January]: SEASON_WINTER,
	[Month.February]: SEASON_WINTER,
	[Month.March]: SEASON_SPRING,
	[Month.April]: SEASON_SPRING,
	[Month.May]: SEASON_SPRING,
	[Month.June]: SEASON_SUMMER,
	[Month.July]: SEASON_SUMMER,
	[Month.August]: SEASON_SUMMER,
	[Month.September]: SEASON_AUTUMN,
	[Month.October]: SEASON_AUTUMN,
	[Month.November]: SEASON_AUTUMN,
	[Month.December]: SEASON_WINTER,
};

export const FLAG_VEGAN = 'vegan';
export const FLAG_VEGETARIAN = 'vegetarian';

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
			this.field('seasons');
			this.field('keywords');

			for (const {
				slug,
				title,
				titleEnglish,
				cuisines,
				ingredients,
				tags,
				vegan,
				vegetarian,
				seasons,
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
					tags: [
						...tags.map((x) => formatTagName(x).split(' ')),
						vegan ? FLAG_VEGAN : [],
						vegetarian ? FLAG_VEGETARIAN : [],
					].flat(),
					seasons: seasons
						.flatMap((x) => [MONTH_TO_NAME[x], MONTH_TO_SEASON[x]])
						.flat(),
					keywords,
				});
			}
		});
	}, [recipes]);
}
