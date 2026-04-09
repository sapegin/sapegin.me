import clsx from 'clsx';
import type {
	IngredientsSection,
	RecipeIngredient,
	Step,
	StepsSection,
} from '../types/Recipe';
import { formatOption, printOption } from '../util/olivier';
import { Markdown } from './Markdown';

interface Props {
	steps: StepsSection[];
	ingredients: IngredientsSection[];
}

function findIngredient(
	ingredients: RecipeIngredient[],
	name: string,
	modifier?: string
) {
	return (
		ingredients.find((x) => x.name === name && x.modifier === modifier) ||
		ingredients.find((x) => x.name === name) ||
		ingredients.find((x) => x.name.endsWith(name))
	);
}

const IngredientAmount = ({
	ingredients,
	name,
	modifier,
}: {
	ingredients: RecipeIngredient[];
	name: string;
	modifier?: string;
}) => {
	const ingredient = findIngredient(ingredients, name, modifier);
	if (ingredient === undefined) {
		return (
			<b style={{ color: 'red' }}>
				ingredient not found: {modifier} {name}
			</b>
		);
	}
	const printed = printOption(formatOption(ingredient));
	return (
		<span className="whitespace-nowrap">
			<em>{printed.amount}</em> {printed.suffix} {printed.modifier}{' '}
			{printed.name}
		</span>
	);
};

function StepItem({
	text,
	pause,
	ingredients,
}: Step & { ingredients: RecipeIngredient[] }) {
	const markdownOverrides = {
		a: {
			component: ({
				children,
				...props
			}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
				children?: React.ReactNode;
			}) => (
				<a className="link" {...props}>
					{children}
				</a>
			),
		},
		Ingredient: { component: IngredientAmount, props: { ingredients } },
	};
	return (
		<li
			className={clsx(
				`
      relative mb-4 list-none pl-[1.1rem]
      before:absolute before:top-[0.25em] before:-left-2 before:size-6
      before:rounded-full before:bg-accent before:text-center before:font-ui
      before:text-xs before:font-bold before:text-background
      before:content-[counter(steps-counter)]
    `,
				'[counter-increment:steps-counter]',
				pause &&
					`
       not-last:mb-12
       before:bg-moon
       not-last:after:absolute not-last:after:right-4 not-last:after:-bottom-10
       not-last:after:left-0 not-last:after:text-center not-last:after:text-lg
       not-last:after:tracking-[0.75em] not-last:after:text-secondary
       not-last:after:content-["···"]
     `
			)}
		>
			<Markdown text={text} overrides={markdownOverrides} />
		</li>
	);
}

export function RecipeSteps({ steps, ingredients }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{steps.length !== ingredients.length && (
				<p style={{ color: 'red' }}>
					Number of sections of ingredients and steps don't match:{' '}
					{steps.length} vs. {ingredients.length}.
				</p>
			)}
			{steps.map((section, index) => {
				if (section.steps.length === 0) {return null;}
				const sectionIngredients = ingredients[index]?.ingredients.flat();
				return (
					<div key={section.name} className="flex flex-col gap-4">
						{section.name && <h3 className="heading-3">{section.name}</h3>}
						<ol className="ml-[0.35rem] flex flex-col gap-2">
							{section.steps.map((step) => (
								<StepItem
									key={step.text}
									{...step}
									ingredients={sectionIngredients}
								/>
							))}
						</ol>
					</div>
				);
			})}
		</div>
	);
}
