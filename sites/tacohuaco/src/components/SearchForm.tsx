import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import { useEffect, useState, type FormEventHandler } from 'react';
import { Input } from './Input';
import { HygraphImage } from './HygraphImage';
import { useIsBrowser } from '../hooks/useIsBrowser';
import type { AutocompleteItem } from '../hooks/useSearch';

const MAX_ITEMS_TO_SHOW = 12;

type Props = {
	items: readonly AutocompleteItem[];
	value: string;
	onChange: (value?: string) => void;
};

const getItemsToShow = (items: readonly AutocompleteItem[], value: string) => {
	if (value === '') return [];
	const filtered = matchSorter(items, value, { keys: ['value'], threshold: matchSorter.rankings.WORD_STARTS_WITH });
	if (filtered.length === items.length) return [];
	return filtered.slice(0, MAX_ITEMS_TO_SHOW);
};

function ItemContainer({ isHighlighted, ...props }: { isHighlighted: boolean } & React.HTMLAttributes<HTMLDivElement>) {
	return <div className={`py-1 px-3 font-ui text-base font-bold cursor-pointer flex items-center gap-3 ${isHighlighted ? 'text-background bg-accent' : 'bg-transparent'}`} {...props} />;
}

export function SearchForm({ items, value, onChange }: Props) {
	const [isEnabled, setIsEnabled] = useState(false);
	const isBrowser = useIsBrowser();
	useEffect(() => { setIsEnabled(isBrowser); }, [isBrowser]);
	const itemsToShow = getItemsToShow(items, value);
	const { getLabelProps, getInputProps, getMenuProps, getItemProps, highlightedIndex, closeMenu, isOpen } = useCombobox({
		items: itemsToShow, inputValue: value, selectedItem: null,
		itemToString: (item) => item?.value ?? '',
		onInputValueChange: ({ inputValue }) => { onChange(inputValue ?? ''); },
		onSelectedItemChange: ({ selectedItem }) => {
			if (selectedItem === null) return;
			if (selectedItem.type === 'recipe' && selectedItem.recipe) { window.location.href = `${window.location.origin}/recipes/${selectedItem.recipe.slug}/`; return; }
			onChange(selectedItem.value);
		},
	});
	const handleSubmit: FormEventHandler = (e) => { closeMenu(); e.preventDefault(); };
	return (
		<form role="search" onSubmit={handleSubmit}>
			<label className="sr-only" {...getLabelProps()}>Search recipes</label>
			<div className="relative">
				<Input
					className="!h-auto !p-3 !text-lg transition-all duration-hover ease-hover [&::-webkit-search-decoration]:hidden [&::-webkit-search-cancel-button]:hidden"
					disabled={!isEnabled}
					{...getInputProps({ type: 'search', placeholder: 'Search recipes' })}
				/>
				<div {...getMenuProps()} className="absolute z-50 left-0 right-0 mt-3 p-2 bg-background border-2 border-accent rounded-none shadow-popover transition-all duration-[0.15s] ease-[ease-out] will-change-[opacity] empty:opacity-0">
					{isOpen && itemsToShow.map((item, index) => {
						const hl = highlightedIndex === index;
						const ip = getItemProps({ item, index });
						if (item.type === 'recipe' && item.recipe) {
							const hasImg = item.recipe.images.length > 0;
							return (
								<ItemContainer key={item.value} isHighlighted={hl} {...ip}>
									{hasImg && <div className="w-9 h-9 shrink-0 bg-light"><HygraphImage handle={item.recipe.images[0].handle} width={36} height={36} quality={30} alt="" loading="lazy" className="w-full h-full object-cover" /></div>}
									<div className="flex flex-col"><span>{item.recipe.title}</span><span className="-mt-2 text-xs">Open recipe</span></div>
								</ItemContainer>
							);
						}
						return <ItemContainer key={item.value} isHighlighted={hl} {...ip}>{item.value}</ItemContainer>;
					})}
				</div>
			</div>
		</form>
	);
}
