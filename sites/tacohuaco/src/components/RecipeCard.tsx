import { type ElementType } from 'react';
import type { RecipeFragment } from '../types/Recipe';
import { HygraphImage } from './HygraphImage';
import { RecipeFlags } from './RecipeFlags';
import { RecipeTimes } from './RecipeTimes';

export function RecipeCard<C extends ElementType = 'div'>({
	as,
	vegan,
	vegetarian,
	glutenFree,
	lowGluten,
	dairyFree,
	noAddedSugar,
	favorite,
	images,
	title,
	slug,
	time,
	overnight,
}: RecipeFragment & { as?: C }) {
	const Component = as ?? 'div';
	return (
		<Component className="flex flex-col gap-3">
			<a
				href={`/recipes/${slug}/`}
				className="duration-hover no-underline transition-colors ease-hover"
			>
				<div className="flex flex-col gap-3">
					<div className="
       md:duration-hover md:transition-shadow md:ease-hover
       md:hover:shadow-input
     ">
						<div className="bg-light" style={{ aspectRatio: '9/6' }}>
							{images.length > 0 && (
								<HygraphImage
									handle={images[0].handle}
									width={480}
									height={480}
									quality={30}
									alt=""
									loading="lazy"
									className="size-full object-cover"
								/>
							)}
						</div>
					</div>
					<span className="font-heading text-heading-2/normal text-inherit">
						{title}
					</span>
				</div>
			</a>
			<div className="flex flex-row items-center gap-3">
				<RecipeFlags
					vegan={vegan}
					vegetarian={vegetarian}
					glutenFree={glutenFree}
					lowGluten={lowGluten}
					dairyFree={dairyFree}
					noAddedSugar={noAddedSugar}
					favorite={favorite}
					hasLinks={false}
				/>
				{time && <RecipeTimes time={time} overnight={overnight} size="small" />}
			</div>
		</Component>
	);
}
