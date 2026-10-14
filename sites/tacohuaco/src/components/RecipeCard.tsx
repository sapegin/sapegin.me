import { type RecipeFragment } from '../types/Recipe';
import { getRecipeThumbnailUrl } from '../util/recipeImages';
import { RecipeTimes } from './RecipeTimes';

export function RecipeCard({ title, slug, time, overnight }: RecipeFragment) {
	return (
		<>
			<a href={`/recipes/${slug}/`} className="quoted-link">
				<span className="flex flex-col gap-2">
					<span className="md:ease-hover md:hover:shadow-input md:transition-shadow md:duration-(--duration-hover)">
						<span className="bg-light block aspect-9/6">
							<img
								src={getRecipeThumbnailUrl(slug)}
								alt=""
								loading="lazy"
								className="size-full object-cover"
							/>
						</span>
					</span>
					<u className="typo-large">{title}</u>
				</span>
			</a>
			{time ? (
				<RecipeTimes time={time} overnight={overnight} size="small" />
			) : null}
		</>
	);
}
