import { Group } from '@shared/packages/tamia/components/Group';
import type { IngredientsSection, RecipeIngredient } from '../types/Recipe';
import { formatOption, printOption } from '../util/olivier';
import { Markdown } from './Markdown';

export interface ExtraSection {
	name: string;
	items: string[];
}

interface Props {
	ingredients: IngredientsSection[];
	extras: ExtraSection[];
}

const IngredientName = ({
	ingredient,
	printName,
}: {
	ingredient: RecipeIngredient;
	printName?: string;
}) => {
	const name = (
		<>
			{ingredient.modifier} {printName}
		</>
	);
	if (ingredient.subrecipeSlug) {
		return (
			<a className="link" href={`/recipes/${ingredient.subrecipeSlug}/`}>
				{name}
			</a>
		);
	}
	return <>{name}</>;
};

function IngredientItem({ options }: { options: RecipeIngredient[] }) {
	const comments = options.map((x) => x.comment);
	return (
		<li className="font-body text-base/normal text-text">
			<Group
				separator={
					<>
						{' '}
						<i>or</i>{' '}
					</>
				}
			>
				{options.map((option, index) => {
					const { name, amount, suffix } = printOption(formatOption(option));
					const shouldShowAmount =
						index === 0 ||
						option.minAmount !== options[0].minAmount ||
						option.maxAmount !== options[0].maxAmount;
					return (
						<Group key={[name, option.modifier].join('-')} separator=" ">
							{shouldShowAmount && <b>{amount}</b>}
							{shouldShowAmount && suffix}
							<IngredientName ingredient={option} printName={name} />
						</Group>
					);
				})}
			</Group>
			{comments.length > 0 && (
				<div className="font-body text-text italic">{comments}</div>
			)}
		</li>
	);
}

export function RecipeIngredients({ ingredients, extras }: Props) {
	return (
		<div className="flex flex-col gap-8">
			{ingredients.map((section) => {
				if (section.ingredients.length === 0) {
					return null;
				}
				return (
					<div key={section.name} className="flex flex-col gap-4">
						{section.name && <h3 className="heading-3">{section.name}</h3>}
						<ol className="flex list-none flex-col gap-4">
							{section.ingredients.map((options) => (
								<IngredientItem
									key={[options[0].name, options[0].modifier].join('-')}
									options={options}
								/>
							))}
						</ol>
					</div>
				);
			})}
			{extras.map(
				(section) =>
					section.items.length > 0 && (
						<div key={section.name} className="flex flex-col gap-4">
							<h3 className="heading-3">{section.name}</h3>
							<ol className="flex list-none flex-col gap-4">
								{section.items.map((item) => (
									<li
										key={item}
										className="font-body text-base/normal text-text"
									>
										<Markdown text={item} />
									</li>
								))}
							</ol>
						</div>
					)
			)}
		</div>
	);
}
