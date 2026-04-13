import type { CoffeeRecipe as CoffeeRecipeType } from '../util/cafe/types';
import { Icon } from './Icon';

interface Props {
	recipe: CoffeeRecipeType;
}

export function CoffeeRecipeCard({ recipe: { name, slug } }: Props) {
	return (
		<a
			href={`/coffee/${slug}/`}
			className="link transition-colors duration-(--duration-hover) ease-hover"
		>
			<span className="flex flex-row items-center gap-3">
				<Icon icon={slug} className="size-8" />
				<span className="font-heading text-xl/heading text-inherit">
					{name}
				</span>
			</span>
		</a>
	);
}
