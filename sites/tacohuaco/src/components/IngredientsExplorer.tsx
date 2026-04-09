import sortBy from 'lodash/sortBy';
import upperFirst from 'lodash/upperFirst';
import type { IngredientsSection, RecipeIngredient } from '../types/Recipe';
import { asList } from '../util/asList';
import { IngredientKind } from '../util/olivier';
import { Season } from './Season';
import { TextContent } from './TextContent';

interface Props {
	ingredients: readonly IngredientsSection[];
}

const KINDS: Record<IngredientKind, string> = {
	[IngredientKind.Vegan]: 'Vegan',
	[IngredientKind.Vegetarian]: 'Vegetarian',
	[IngredientKind.Poultry]: 'Poultry',
	[IngredientKind.Fish]: 'Fish',
	[IngredientKind.Meat]: 'Meat',
	[IngredientKind.Unknown]: 'Unknown',
};

const printContents = (ingredient: RecipeIngredient): string =>
	upperFirst(
		asList([
			ingredient.hasGluten && 'gluten',
			ingredient.hasDairy && 'dairy',
			ingredient.hasSugar && 'refined sugar',
		])
	);

export function IngredientsExplorer({ ingredients }: Props) {
	const allIngredients = ingredients.map((x) => x.ingredients).flat(2);
	const sorted = sortBy(allIngredients, (x) => x.name);
	return (
		<TextContent>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Kind</th>
						<th>Season</th>
						<th>Contains</th>
					</tr>
				</thead>
				<tbody>
					{sorted.map((ingredient, index) => (
						<tr key={index}>
							<th>{upperFirst(ingredient.name)}</th>
							<td>{KINDS[ingredient.kind]}</td>
							<td><Season ingredient={ingredient} /></td>
							<td>{printContents(ingredient)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</TextContent>
	);
}
