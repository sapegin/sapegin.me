type Amount = number | null;

export enum Action {
	Rinse = 'Rinse',
	Pour = 'Pour',
	Shake = 'Shake',
	Custom = 'Custom',
}

interface GenericStep {
	time?: number;
}

interface RinseStep extends GenericStep {
	action: Action.Rinse;
}

interface PourStep extends GenericStep {
	action: Action.Pour;
	amount: Amount; // 0.25 → amount / 4
}

interface ShakeStep extends GenericStep {
	action: Action.Shake;
}

interface CustomStep extends GenericStep {
	action: Action.Custom;
	message: string;
}

export type Step = RinseStep | PourStep | ShakeStep | CustomStep;

export interface CoffeeRecipe {
	slug: string;
	name: string;
	brewer: string;
	description?: string;
	ratio: number; // 15 → 1:15
	defaultAmount: number;
	grind: string;
	temperature: number;
	steps: Step[];
	stepsOneCup?: Step[];
}
