import { Group } from '@shared/packages/tamia/components/Group';
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
import { Typo } from './Typo';

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
			<div className="recipe-steps flex flex-col gap-8">
				<CoffeeRecipeMeta coffeeAmount={g} waterAmount={currentAmount}>
					{isScalingEnabled && (
						<div className="flex min-w-0 flex-row items-center gap-2">
							<button onClick={handleLess} className="button">
								Less
							</button>
							<button onClick={handleMore} className="button">
								More
							</button>
						</div>
					)}
				</CoffeeRecipeMeta>
				<ol className="flex max-w-140 flex-col gap-2">
					<li className="flex flex-col gap-2">
						<p className="typo-body">
							{recipe.temperature === 100 ? (
								<>Boil water.</>
							) : (
								<>
									Heat water to{' '}
									<b>
										<Typo>{`${recipe.temperature}C`}</Typo>
									</b>
									.
								</>
							)}
						</p>
						{recipe.temperature < 100 && (
							<p className="typo-body">
								<Typo>
									(If your kettle doesn’t have a temperature setting, let the
									water cool down for 30 seconds before brewing coffee.)
								</Typo>
							</p>
						)}
					</li>
					<li className="flex flex-col gap-2">
						<p className="typo-body">
							Grind <b>{g} g</b> of coffee ({recipe.grind}).
						</p>
						<p className="typo-body">
							<Typo>
								(It’s roughly {beansToTbsp(g)} tablespoons of coffee beans or{' '}
								{groundToTbsp(g)} tablespoons of ground coffee.)
							</Typo>
						</p>
					</li>
					{steps.map((step, i) => (
						// eslint-disable-next-line @eslint-react/no-array-index-key
						<li key={i}>
							<p className="typo-body">
								<Group>
									{getStepText(step, recipe, currentAmount)}
									{getWaitText(step)}
								</Group>
							</p>
						</li>
					))}
					<li>
						<p className="typo-body">Enjoy your coffee! ☕️</p>
					</li>
				</ol>
			</div>
		</div>
	);
}
