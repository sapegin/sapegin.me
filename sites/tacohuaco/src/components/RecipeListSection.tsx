import { type ReactNode } from 'react';
import type { RecipeFragment } from '../types/Recipe';
import { RecipeList } from './RecipeList';

interface Props {
	title: ReactNode;
	recipes: RecipeFragment[];
	children?: ReactNode;
}

export function RecipeListSection({ title, recipes, children }: Props) {
	return (
		<section className="flex flex-col gap-8">
			<div className="flex flex-col gap-3">
				<h2 className="heading-1">{title}</h2>
				{children}
			</div>
			<RecipeList recipes={recipes} />
		</section>
	);
}
