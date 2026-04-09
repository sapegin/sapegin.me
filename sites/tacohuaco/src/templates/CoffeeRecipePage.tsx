import { PageWithTitle } from './PageWithTitle';
import { type CoffeeRecipe as CoffeeRecipeType } from '../util/cafe/types';
import type { ReactNode } from 'react';
import { Markdown } from '../components/Markdown';
import { TextContent } from '../components/TextContent';
import Group from 'react-group';

type Props = CoffeeRecipeType & {
	url: string;
	children: ReactNode;
};

export function CoffeeRecipePage({ url, description, children, ...recipe }: Props) {
	return (
		<PageWithTitle url={url} title={`${recipe.name} coffee recipe`}>
			<div className="flex flex-col gap-8">
				<TextContent variant="intro">
					<Group>
						<>Brew awesome coffee in {recipe.brewer}.</>
						{description && <Markdown text={description} />}
					</Group>
				</TextContent>
				{children}
			</div>
		</PageWithTitle>
	);
}
