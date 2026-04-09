import { Icon } from './Icon';
import type { CoffeeRecipe as CoffeeRecipeType } from '../util/cafe/types';

type Props = {
	recipe: CoffeeRecipeType;
};

export function CoffeeRecipeCard({ recipe: { name, slug } }: Props) {
	return (
		<a href={`/coffee/${slug}/`} className="link transition-colors duration-hover ease-hover">
			<span className="flex flex-row gap-3 items-center">
				<Icon icon={slug} width={30} height={30} />
				<span className="font-heading text-xl text-inherit leading-normal">{name}</span>
			</span>
		</a>
	);
}
