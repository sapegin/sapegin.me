import { type ReactNode } from 'react';
import { Group } from 'tamia/dist/components/Group.js';
import { Markdown } from '../components/Markdown';
import { type CoffeeRecipe as CoffeeRecipeType } from '../util/cafe/types';
import { PageWithTitle } from './PageWithTitle';

type Props = CoffeeRecipeType & {
	url: string;
	children: ReactNode;
};

export function CoffeeRecipePage({
	url,
	description,
	children,
	...recipe
}: Props) {
	return (
		<PageWithTitle url={url} title={`${recipe.name} coffee recipe`}>
			<div className="flex flex-col gap-8">
				<div className="prose">
					<p className="typo-intro">
						<Group>
							<>Brew awesome coffee in {recipe.brewer}.</>
							{description && <Markdown text={description} />}
						</Group>
					</p>
				</div>
				{children}
			</div>
		</PageWithTitle>
	);
}
