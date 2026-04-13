import deburr from 'lodash/deburr';
import lunr from 'lunr';
import { useMemo } from 'react';
import type { RecipeFragment } from '../types/Recipe';
import { formatTagName } from '../util/formatTagName';

export function useSearchIndex(recipes: readonly RecipeFragment[]) {
	return useMemo(() => {
		return lunr(function () {
			this.ref('slug');
			this.field('title', { boost: 3 });
			this.field('titleEnglish', { boost: 3 });
			this.field('tags');
			this.field('keywords');

			for (const { slug, title, titleEnglish, tags, keywords } of recipes) {
				this.add({
					slug,
					title: deburr(title),
					titleEnglish: deburr(titleEnglish),
					// Tags come like `awesome-pizza`, we need to convert them to words and
					// then split into an array so Lunr indexes them as separate words
					tags: tags.flatMap((x) => formatTagName(x).split(' ')),
					keywords,
				});
			}
		});
	}, [recipes]);
}
