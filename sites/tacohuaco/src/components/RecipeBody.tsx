import { Markdown } from './Markdown';
import { Collapsible } from './Collapsible';
import { TextContent } from './TextContent';
import { formatOption } from '../util/olivier';
import type { Recipe, Yields } from '../types/Recipe';
import { RecipeIngredients } from './RecipeIngredients';
import { RecipeSteps } from './RecipeSteps';
import { IngredientsExplorer } from './IngredientsExplorer';
import { useScale } from '../hooks/useScale';
import { RecipeScale } from './RecipeScale';
import { RecipeChart } from './RecipeChart';

const YieldsText = ({ amount, unit }: Yields) => {
	const { minAmount: printedAmount, unit: printedUnit } = formatOption({
		minAmount: amount,
		maxAmount: amount,
		unit,
		name: '',
	});
	return `Yields ${printedAmount} ${printedUnit}`;
};

export function RecipeBody(recipe: Recipe) {
	const { ingredients, notes, chart, source, steps, tips, tools, warnings, yields } = recipe;
	const { isScalingEnabled, currentAmount, scaledIngredients, handleLess, handleMore } = useScale(recipe);
	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-[1.2fr_2.8fr] lg:grid-cols-[1fr_3fr]">
			<section className="flex flex-col gap-4">
				<div className="flex flex-row gap-4 md:gap-3 items-center">
					<h2 className="heading-2">Ingredients</h2>
					<div>
						{isScalingEnabled && <RecipeScale onLess={handleLess} onMore={handleMore} />}
					</div>
				</div>
				<p className="font-body italic text-text">
					<YieldsText amount={currentAmount} unit={yields.unit} />
				</p>
				<RecipeIngredients
					ingredients={scaledIngredients}
					extras={[
						{ name: 'Warnings', items: warnings },
						{ name: 'You will need', items: tools },
					]}
				/>
			</section>
			<section className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">Directions</h2>
					<div className="flex flex-col gap-8">
						<RecipeChart chart={chart} />
						<RecipeSteps steps={steps} ingredients={scaledIngredients} />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					{(notes.length > 0 || tips.length > 0 || source) && (
						<>
							<h2 className="heading-2">Notes &amp; tips</h2>
							{notes.map((note) => <TextContent key={note}><Markdown text={note} /></TextContent>)}
							{tips.map((tip) => <TextContent key={tip}><Markdown text={tip} /></TextContent>)}
							{source && <TextContent variant="small"><Markdown text={source} forceBlock /></TextContent>}
						</>
					)}
				</div>
				<Collapsible label="Explore ingredients">
					<h2 className="sr-only">Ingredients explorer</h2>
					<IngredientsExplorer ingredients={ingredients} />
				</Collapsible>
			</section>
		</div>
	);
}
