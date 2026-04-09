import type { TipModel, TipModelRaw } from '../types.ts';
import { mapMaybeString } from './mapMaybeString.ts';

export function mapTipsModel(ingredients: TipModelRaw[]): TipModel[] {
	return ingredients.map(({ content, tags, ingredient }) => ({
		content,
		tags,
		ingredient: mapMaybeString(ingredient),
	}));
}
