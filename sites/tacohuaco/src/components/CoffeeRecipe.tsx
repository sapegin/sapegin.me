import { type CoffeeRecipe as CoffeeRecipeType, type Step, Action } from '../util/cafe/types';
import Group from 'react-group';
import { useCoffeeScale } from '../hooks/useCoffeeScale';
import { RecipeScale } from './RecipeScale';
import { GRAMS_IN_TABLESPOON_COFFEE_BEANS, GRAMS_IN_TABLESPOON_GROUND_COFFEE, ONE_CUP_GRAMS } from '../util/cafe';
import { TextTypo } from './TextTypo';
import { CoffeeRecipeMeta } from './CoffeeRecipeMeta';
import clsx from 'clsx';

type Props = { recipe: CoffeeRecipeType };

const roundToTen = (v: number) => Math.floor(v / 10) * 10;
const roundToHalf = (v: number) => Math.round(v * 2) / 2;
const formatDuration = (s: number) => {
	const m = Math.trunc(s / 60) % 60;
	const sec = Math.trunc(s) % 60;
	if (m) return `${m} minutes`;
	if (sec) return `${sec} seconds`;
	return '';
};
const getCoffeeInGrams = (ratio: number, water: number) => Math.floor(water / ratio);
const beansToTbsp = (g: number) => roundToHalf(g / GRAMS_IN_TABLESPOON_COFFEE_BEANS);
const groundToTbsp = (g: number) => roundToHalf(g / GRAMS_IN_TABLESPOON_GROUND_COFFEE);
const getWaterAmount = (step: Step, cur: number) => {
	if (step.action !== Action.Pour) return '';
	if (step.amount === null) return 'the rest';
	return `${roundToTen(cur * step.amount)} g`;
};
const getStepText = (step: Step, _r: CoffeeRecipeType, cur: number) => {
	switch (step.action) {
		case Action.Rinse: return <>Rinse the filter, and discard the dirty water.</>;
		case Action.Pour: return <>Pour <b>{getWaterAmount(step, cur)}</b> of water.</>;
		case Action.Shake: return <>Shake the thing.</>;
		case Action.Custom: return step.message;
	}
};
const getWaitText = (step: Step) => step.time ? <>Wait <b>{formatDuration(step.time)}</b>.</> : null;

const stepCls = (pause: boolean) => clsx(
	'list-none relative pl-[1.1rem] mb-4 [counter-increment:steps-counter]',
	'before:content-[counter(steps-counter)] before:absolute before:top-[0.25em] before:-left-2 before:w-6 before:h-6 before:text-center before:text-background before:font-ui before:text-xs before:font-bold before:rounded-full',
	pause
		? 'before:bg-moon [&:not(:last-child)]:mb-12 [&:not(:last-child)]:after:content-["···"] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:-bottom-10 [&:not(:last-child)]:after:left-0 [&:not(:last-child)]:after:right-4 [&:not(:last-child)]:after:text-center [&:not(:last-child)]:after:tracking-[0.75em] [&:not(:last-child)]:after:text-lg [&:not(:last-child)]:after:text-secondary'
		: 'before:bg-accent'
);

export function CoffeeRecipe({ recipe }: Props) {
	const { isScalingEnabled, currentAmount, handleLess, handleMore } = useCoffeeScale(recipe);
	const steps = recipe.stepsOneCup && currentAmount <= ONE_CUP_GRAMS ? recipe.stepsOneCup : recipe.steps;
	if (steps.length === 0) return null;
	const g = getCoffeeInGrams(recipe.ratio, currentAmount);
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-8">
				<CoffeeRecipeMeta coffeeAmount={g} waterAmount={currentAmount}>
					{isScalingEnabled && <RecipeScale onLess={handleLess} onMore={handleMore} />}
				</CoffeeRecipeMeta>
				<ol className="flex flex-col gap-2 ml-[0.35rem] max-w-[35rem]">
					<li className={stepCls(false)}>
						<div className="flex flex-col gap-2">
							<TextTypo>{recipe.temperature === 100 ? <>Boil water.</> : <>Heat water to <TextTypo as="b">{`${recipe.temperature}C`}</TextTypo>.</>}</TextTypo>
							{recipe.temperature < 100 && <TextTypo>(If your kettle doesn&apos;t have a temperature setting, let the water cool down for 30 seconds before brewing coffee.)</TextTypo>}
						</div>
					</li>
					<li className={stepCls(false)}>
						<TextTypo>Grind <b>{g} g</b> of coffee ({recipe.grind}).</TextTypo>
						<TextTypo>(It&apos;s roughly {beansToTbsp(g)} tablespoons of coffee beans or {groundToTbsp(g)} tablespoons of ground coffee.)</TextTypo>
					</li>
					{steps.map((step, i) => (
						<li key={i} className={stepCls((step.time ?? 0) > 30)}>
							<TextTypo><Group>{getStepText(step, recipe, currentAmount)}{getWaitText(step)}</Group></TextTypo>
						</li>
					))}
					<li className={stepCls(false)}><TextTypo>Enjoy your coffee! ☕️</TextTypo></li>
				</ol>
			</div>
		</div>
	);
}
