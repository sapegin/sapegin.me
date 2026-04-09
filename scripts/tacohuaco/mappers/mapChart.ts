import {
	type ChartStep,
	ChartStepType,
	type RecipeIngredient,
	type StepsSection,
} from '../../../sites/tacohuaco/src/types/Recipe.ts';

// TODO: Do something with oven/air fryer recipes:
// arrange the tacos on a baking sheet (or in the air fryer basket) and bake for about 25 minutes in the oven (or for about 12 minutes in the air fryer at 200c), until very crispy.

const isOvernight = (text: string) => /\bovernight\b/.test(text);
const isCovered = (text: string) => /\bcover(ed)?\b/.test(text);

/**
 * Recipe chart steps: to show important steps of the recipe at a glance, things
 * like preheating oven, marinating meat, or cooking for a long time
 */
export const mapChart = (
	ingredients: RecipeIngredient[],
	stepsSections: StepsSection[]
): ChartStep[] => {
	const chartSteps: ChartStep[] = [];

	for (const { comment, name } of ingredients) {
		if (
			comment?.startsWith('room temperature') ||
			comment?.startsWith('at room temperature')
		) {
			chartSteps.push({
				type: ChartStepType.WarmToRoomTemp,
				subtype: name,
				overnight: false,
				covered: false,
			});
		}

		if (name.endsWith('broth')) {
			chartSteps.push({
				type: ChartStepType.WarmToRoomTemp,
				subtype: name,
				overnight: false,
				covered: false,
			});
		}
	}

	for (const { steps } of stepsSections) {
		for (const { text } of steps) {
			const lowCaseText = text
				.toLowerCase()
				.replaceAll('–', '-') // N-dash
				.replaceAll(' ', ' '); // Non-breaking space

			if (/(leave|rest|cool down|soak).*(for|overnight)/.test(lowCaseText)) {
				const [, action, value, unit] =
					lowCaseText.match(
						/(leave|rest|cool down|soak)(?:.*for\D+([\d-.]+).*(minutes|hours?|days?|weeks?|months?))?/
					) ?? [];

				if (action === '') {
					continue;
				}
				chartSteps.push({
					type: action === 'soak' ? ChartStepType.Soak : ChartStepType.Rest,
					value: `${value ?? ''} ${unit ?? ''}`.trim(),
					overnight: isOvernight(lowCaseText),
					covered: isCovered(lowCaseText),
				});
				continue;
			}

			if (
				/(cook|bake|fry|roast|braise|boil|simmer|poach)\b.*(covered|uncovered)? for/.test(
					lowCaseText
				)
			) {
				const [, action, value, unit] =
					lowCaseText.match(
						/(cook|bake|fry|roast|braise|boil|simmer|poach)\b.*for\D+([\d-.]+).*(minutes|hours?)/
					) ?? [];
				if (action === '') {
					continue;
				}
				const [firstAmount, secondAmount] = value.split('-');

				if (
					Number.parseInt(firstAmount) >= 7 ||
					Number.parseInt(secondAmount) >= 7 ||
					unit.startsWith('hour')
				) {
					chartSteps.push({
						type: ['bake', 'braise', 'roast'].includes(action)
							? ChartStepType.CookInOven
							: ChartStepType.Cook,
						subtype: action,
						value: `${value} ${unit}`,
						covered: isCovered(lowCaseText),
						overnight: false,
					});
				}
				continue;
			}

			if (/refrigerate/.test(lowCaseText)) {
				const [, value, unit] =
					lowCaseText.match(/([\d-.]+) (minutes|hours?|weeks?|months?)/) ?? [];
				chartSteps.push({
					type: ChartStepType.Refrigerate,
					value: value && unit && `${value} ${unit}`,
					overnight: isOvernight(lowCaseText),
					covered: isCovered(lowCaseText),
				});
				continue;
			}

			if (/preheat/.test(lowCaseText)) {
				const [, value] =
					text.match(
						/(?:preheat oven to|if using an oven, preheat it to) (\d+c)/i
					) ?? [];
				if (value === '') {
					continue;
				}
				chartSteps.push({
					type: ChartStepType.PreheatOven,
					value,
					overnight: false,
					covered: false,
				});
				continue;
			}
		}
	}

	return chartSteps;
};
