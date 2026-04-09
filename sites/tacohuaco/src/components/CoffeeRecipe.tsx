import clsx from 'clsx';
import Group from 'react-group';
import { useCoffeeScale } from '../hooks/useCoffeeScale';
import {
	GRAMS_IN_TABLESPOON_COFFEE_BEANS,
	GRAMS_IN_TABLESPOON_GROUND_COFFEE,
	ONE_CUP_GRAMS,
} from '../util/cafe';
import {
	Action,
	type CoffeeRecipe as CoffeeRecipeType,
	type Step,
} from '../util/cafe/types';
import { CoffeeRecipeMeta } from './CoffeeRecipeMeta';
import { RecipeScale } from './RecipeScale';
import { TextTypo } from './TextTypo';

interface Props {
	recipe: CoffeeRecipeType;
}

const roundToTen = (v: number) => Math.floor(v / 10) * 10;
const roundToHalf = (v: number) => Math.round(v * 2) / 2;
const formatDuration = (s: number) => {
	const m = Math.trunc(s / 60) % 60;
	const sec = Math.trunc(s) % 60;
	if (m) {
		return `${m} minutes`;
	}
	if (sec) {
		return `${sec} seconds`;
	}
	return '';
};
const getCoffeeInGrams = (ratio: number, water: number) =>
	Math.floor(water / ratio);
const beansToTbsp = (g: number) =>
	roundToHalf(g / GRAMS_IN_TABLESPOON_COFFEE_BEANS);
const groundToTbsp = (g: number) =>
	roundToHalf(g / GRAMS_IN_TABLESPOON_GROUND_COFFEE);
const getWaterAmount = (step: Step, cur: number) => {
	if (step.action !== Action.Pour) {
		return '';
	}
	if (step.amount === null) {
		return 'the rest';
	}
	return `${roundToTen(cur * step.amount)} g`;
};
const getStepText = (step: Step, _r: CoffeeRecipeType, cur: number) => {
	switch (step.action) {
		case Action.Rinse:
			return <>Rinse the filter, and discard the dirty water.</>;
		case Action.Pour:
			return (
				<>
					Pour <b>{getWaterAmount(step, cur)}</b> of water.
				</>
			);
		case Action.Shake:
			return <>Shake the thing.</>;
		case Action.Custom:
			return step.message;
	}
};
const getWaitText = (step: Step) =>
	step.time ? (
		<>
			Wait <b>{formatDuration(step.time)}</b>.
		</>
	) : null;

const stepCls = (pause: boolean) =>
	clsx(
		'relative mb-4 list-none pl-[1.1rem] [counter-increment:steps-counter]',
		`
    before:absolute before:top-[0.25em] before:-left-2 before:size-6
    before:rounded-full before:text-center before:font-ui before:text-xs
    before:font-bold before:text-background
    before:content-[counter(steps-counter)]
  `,
		pause
			? `
     not-last:mb-12
     before:bg-moon
     not-last:after:absolute not-last:after:right-4 not-last:after:-bottom-10
     not-last:after:left-0 not-last:after:text-center not-last:after:text-lg
     not-last:after:tracking-[0.75em] not-last:after:text-secondary
     not-last:after:content-["···"]
   `
			: 'before:bg-accent'
	);

export function CoffeeRecipe({ recipe }: Props) {
	const { isScalingEnabled, currentAmount, handleLess, handleMore } =
		useCoffeeScale(recipe);
	const steps =
		recipe.stepsOneCup && currentAmount <= ONE_CUP_GRAMS
			? recipe.stepsOneCup
			: recipe.steps;
	if (steps.length === 0) {
		return null;
	}
	const g = getCoffeeInGrams(recipe.ratio, currentAmount);
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-8">
				<CoffeeRecipeMeta coffeeAmount={g} waterAmount={currentAmount}>
					{isScalingEnabled && (
						<RecipeScale onLess={handleLess} onMore={handleMore} />
					)}
				</CoffeeRecipeMeta>
				<ol className="ml-[0.35rem] flex max-w-140 flex-col gap-2">
					<li className={stepCls(false)}>
						<div className="flex flex-col gap-2">
							<TextTypo className="typo-body">
								{recipe.temperature === 100 ? (
									<>Boil water.</>
								) : (
									<>
										Heat water to{' '}
										<TextTypo as="b">{`${recipe.temperature}C`}</TextTypo>.
									</>
								)}
							</TextTypo>
							{recipe.temperature < 100 && (
								<TextTypo className="typo-body">
									(If your kettle doesn&apos;t have a temperature setting, let
									the water cool down for 30 seconds before brewing coffee.)
								</TextTypo>
							)}
						</div>
					</li>
					<li className={stepCls(false)}>
						<TextTypo className="typo-body">
							Grind <b>{g} g</b> of coffee ({recipe.grind}).
						</TextTypo>
						<TextTypo className="typo-body">
							(It&apos;s roughly {beansToTbsp(g)} tablespoons of coffee beans or{' '}
							{groundToTbsp(g)} tablespoons of ground coffee.)
						</TextTypo>
					</li>
					{steps.map((step, i) => (
						<li key={i} className={stepCls((step.time ?? 0) > 30)}>
							<TextTypo className="typo-body">
								<Group>
									{getStepText(step, recipe, currentAmount)}
									{getWaitText(step)}
								</Group>
							</TextTypo>
						</li>
					))}
					<li className={stepCls(false)}>
						<TextTypo className="typo-body">Enjoy your coffee! ☕️</TextTypo>
					</li>
				</ol>
			</div>
		</div>
	);
}
