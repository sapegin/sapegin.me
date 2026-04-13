import type { RecipeFragment } from '../types/Recipe';
import { RecipeTimes } from './RecipeTimes';

export function RecipeCard({
	thumbnailUrl,
	title,
	slug,
	time,
	overnight,
}: RecipeFragment) {
	return (
		<>
			<a href={`/recipes/${slug}/`} className="quoted-link">
				<span className="flex flex-col gap-2">
					<span
						className="
        md:transition-shadow md:duration-(--duration-hover) md:ease-hover
        md:hover:shadow-input
      "
					>
						<span className="block aspect-9/6 bg-light">
							{thumbnailUrl && (
								<img
									src={thumbnailUrl}
									alt=""
									loading="lazy"
									className="size-full object-cover"
								/>
							)}
						</span>
					</span>
					<u className="font-heading text-xl text-inherit">{title}</u>
				</span>
			</a>
			{time ? (
				<RecipeTimes time={time} overnight={overnight} size="small" />
			) : null}
		</>
	);
}
