import type { Recipe } from '../types/Recipe';
import { Markdown } from './Markdown';

export function RecipeBody({
	ingredients,
	notes,
	source,
	steps,
	tools,
	yields,
}: Recipe) {
	return (
		<div
			className="
     grid grid-cols-1 gap-4
     md:grid-cols-[1.2fr_2.8fr]
     lg:grid-cols-[1fr_3fr]
   "
		>
			<section className="flex flex-col gap-8">
				<header className="flex flex-col gap-4">
					<h2 className="heading-2">Ingredients</h2>
					{yields && (
						<p className="font-body text-text italic">Yields {yields}</p>
					)}
				</header>
				<div className="recipe-ingredients">
					<Markdown text={ingredients} />
				</div>
				{tools && (
					<div className="flex flex-col gap-4">
						<h3 className="heading-3">You will need</h3>
						<div className="recipe-ingredients">
							<Markdown text={tools} />
						</div>
					</div>
				)}
			</section>
			<section className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">Directions</h2>
					<div className="recipe-steps">
						<Markdown text={steps} forceBlock />
					</div>
				</div>
				{(notes ?? source) && (
					<div className="flex flex-col gap-4">
						<h2 className="heading-2">Notes</h2>
						{notes && (
							<div className="prose">
								<Markdown text={notes} />
							</div>
						)}
						{source && (
							<p className="prose typo-small">
								<Markdown text={source} forceInline />
							</p>
						)}
					</div>
				)}
			</section>
		</div>
	);
}
