#!/usr/bin/env node

import fs from 'node:fs';
import { gql, request } from 'graphql-request';
import { mapIngredientsModel } from './mappers/mapIngredientsModel.ts';
import { mapRecipe } from './mappers/mapRecipe.ts';
import { mapTipsModel } from './mappers/mapTipsModel.ts';
import type {
	CalendarMonthModelRaw,
	IngredientModelRaw,
	RecipeModelRaw,
	TipModelRaw,
} from './types';

// Fetch _all_ the data from Hygraph and convert it to JSON files that could
// be used in Astro

// TODO: Move to scripts/sync-recipes.ts
// TODO: Migrate to Obsidian instead of Hygraph

// TODO: Make warnings more prominent
// TODO: Count warnings
// TODO: Show warnings summary
// TODO: Fail the build
// TODO: Check for missing items (but some text) in ingredients, steps and tools

if (process.env.GRAPHCMS_TOKEN === undefined) {
	console.error('GRAPHCMS_TOKEN environmental variable is required');
	process.exit(1);
}

const endpoint = `https://api-eu-central-1.graphcms.com/v2/${process.env.GRAPHCMS_TOKEN}/master`;

const query = gql`
	{
		recipes {
			createdAt
			cuisines
			description
			favorite
			ingredients
			keywords
			notes
			overnight
			slug
			source
			steps
			tags
			time
			title
			titleEnglish
			tools
			yields
			images {
				url
				handle
				width
				height
			}
			subrecipes {
				slug
				title
				ingredients
				steps
				tools
			}
			recipes {
				createdAt
				cuisines
				images {
					handle
					height
					url
					width
				}
				ingredients
				favorite
				overnight
				slug
				subrecipes {
					slug
					title
					ingredients
					steps
					tools
				}
				time
				title
				tags
			}
		}
		ingredients {
			name
			warnings
		}
		tips {
			content
			tags
			ingredient
		}
		calendarMonths {
			name
			breakfasts
			lunches
			specials
			sweets
			snacks
		}
	}
`;

console.log('🌮 Syncing content...');

console.log();
console.log('🌭 Fetching data from Hygraph...');

const results = await request<{
	recipes: RecipeModelRaw[];
	ingredients: IngredientModelRaw[];
	tips: TipModelRaw[];
	calendarMonths: CalendarMonthModelRaw[];
}>(endpoint, query);

console.log();
console.log('🌭 Parsing data...');

fs.ensureDirSync('content/recipes');
fs.ensureDirSync('content/calendarMonths');

const ingredients = mapIngredientsModel(results.ingredients);
const tips = mapTipsModel(results.tips);

// Saving recipes
for (const recipeRaw of results.recipes) {
	console.log('👉', recipeRaw.title);
	const recipe = mapRecipe(recipeRaw, ingredients, tips);
	fs.writeJSONSync(`content/recipes/${recipe.slug}.json`, recipe, {
		spaces: 2,
	});
}

console.log();
console.log(`🍆 ${results.recipes.length} recipes done`);
