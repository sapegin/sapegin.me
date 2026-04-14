import type { CoffeeRecipe as CoffeeRecipeType } from '../util/cafe/types';
import { Icon } from './Icon';

interface Props {
	recipe: CoffeeRecipeType;
}

export function CoffeeRecipeCard({ recipe: { name, slug } }: Props) {
	return (
		<a href={`/coffee/${slug}/`} className="quoted-link">
			<span className="flex items-center gap-3">
				<Icon icon={slug} className="size-8" />
				<u className="typo-large">{name}</u>
			</span>
		</a>
	);
}
