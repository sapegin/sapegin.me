import clsx from 'clsx';
import { type RecipeFragment } from '../types/Recipe';
import { getRecipeImageUrl, getRecipeThumbnailUrl } from '../util/recipeImages';

type Props = Pick<RecipeFragment, 'slug' | 'width' | 'height' | 'color'> & {
	variant: 'hero' | 'thumbnail' | 'mini-thumbnail';
	className?: string;
};

/**
 * Recipe hero or thumbnail image with intrinsic dimensions and color
 * placeholder.
 */
export function RecipeImage({
	slug,
	width,
	height,
	color,
	variant,
	className,
}: Props) {
	return (
		<img
			src={
				variant === 'hero'
					? getRecipeImageUrl(slug)
					: getRecipeThumbnailUrl(slug)
			}
			width={width}
			height={height}
			alt=""
			loading={variant === 'hero' ? undefined : 'lazy'}
			className={clsx(
				variant === 'hero' ? 'h-auto max-w-full' : 'block w-full object-cover',
				variant === 'thumbnail' && 'aspect-9/6',
				variant === 'mini-thumbnail' && 'aspect-1/1',
				className
			)}
			style={{ backgroundColor: color }}
		/>
	);
}
