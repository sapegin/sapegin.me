import { type RecipeFragment } from '../types/Recipe';
import { RecipeImage } from './RecipeImage';
import { RecipeTimes } from './RecipeTimes';

export function RecipeCard({
	title,
	slug,
	width,
	height,
	color,
	time,
	overnight,
}: RecipeFragment) {
	return (
		<>
			<a href={`/recipes/${slug}/`} className="quoted-link">
				<span className="flex flex-col gap-2">
					<span className="md:ease-hover md:hover:shadow-input md:transition-shadow md:duration-(--duration-hover)">
						<span className="bg-light block">
							<RecipeImage
								variant="thumbnail"
								slug={slug}
								width={width}
								height={height}
								color={color}
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
