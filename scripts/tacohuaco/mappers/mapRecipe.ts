import type {
	Recipe,
	Yields,
} from '../../../sites/tacohuaco/src/types/Recipe.ts';
import { getAllIngredients } from '../../../sites/tacohuaco/src/util/getAllIngredients.ts';
import { normalizeOption } from '../../../sites/tacohuaco/src/util/olivier/normalize.ts';
import { parseOption } from '../../../sites/tacohuaco/src/util/olivier/parse.ts';
import type { IngredientModel, RecipeModelRaw, TipModel } from '../types.ts';
import { mapChart } from './mapChart.ts';
import { mapFlags } from './mapFlags.ts';
import { mapIngredients } from './mapIngredients.ts';
import { mapMaybeNumber } from './mapMaybeNumber.ts';
import { mapMaybeString } from './mapMaybeString.ts';
import { mapSeasons } from './mapSeasons.ts';
import { mapSteps } from './mapSteps.ts';
import { mapTips } from './mapTips.ts';
import { mapTools } from './mapTools.ts';
import { mapWarnings } from './mapWarnings.ts';

function mapDate(date: string) {
	return new Date(Date.parse(date));
}

function mapKeywords(keywords: RecipeModelRaw['keywords']) {
	return keywords === null ? [] : keywords.split(/\s*[,;]\s*/);
}

function mapNotes(notes: RecipeModelRaw['notes']) {
	return notes === null ? [] : notes.split(/\n+/);
}

// TODO: extract
// TODO: add tests
// TODO: in the future make it a required field in Hygraph
function mapYields(yields: RecipeModelRaw['yields']): Yields {
	const { minAmount, unit } = normalizeOption(
		parseOption(`${yields === null ? '1 portion' : yields} yields`)
	);
	return {
		amount: Number(minAmount ?? 1),
		unit: unit ?? 'portion',
	};
}

export function mapRecipe(
	recipe: RecipeModelRaw,
	allIngredients: IngredientModel[],
	allTips: TipModel[]
): Recipe {
	const ingredientsSections = mapIngredients(
		recipe.ingredients,
		recipe.subrecipes
	);
	const subrecipes = recipe.subrecipes.map(({ slug, title }) => ({
		slug,
		title,
	}));
	const ingredients = getAllIngredients(ingredientsSections);
	const recipes = recipe.recipes.map(({ slug, title }) => ({
		slug,
		title,
	}));
	const stepsSections = mapSteps(recipe.steps, recipe.subrecipes);

	if (stepsSections.length !== ingredientsSections.length) {
		console.error();
		console.error(
			`Number of sections of ingredients and steps don’t match: ${stepsSections.length} vs. ${ingredientsSections.length}.`
		);
		console.error();
	}

	return {
		...recipe,
		subrecipes,
		recipes,
		steps: stepsSections,
		ingredients: ingredientsSections,
		titleEnglish: mapMaybeString(recipe.titleEnglish),
		createdAt: mapDate(recipe.createdAt),
		keywords: mapKeywords(recipe.keywords),
		tools: mapTools(recipe.tools, recipe.subrecipes, ingredientsSections),
		notes: mapNotes(recipe.notes),
		seasons: mapSeasons(ingredients),
		chart: mapChart(ingredients, stepsSections),
		description: mapMaybeString(recipe.description),
		source: mapMaybeString(recipe.source),
		yields: mapYields(recipe.yields),
		time: mapMaybeNumber(recipe.time),
		tips: mapTips(ingredients, recipe.tags, allTips),
		warnings: mapWarnings(ingredients, allIngredients),
		...mapFlags(ingredients),
	};
}
