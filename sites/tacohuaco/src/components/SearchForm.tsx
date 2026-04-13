import { useCombobox } from 'downshift';
import { matchSorter } from 'match-sorter';
import { type SubmitEventHandler, useSyncExternalStore } from 'react';
import type { AutocompleteItem } from '../hooks/useSearch';

const MAX_ITEMS_TO_SHOW = 12;

interface Props {
	items: readonly AutocompleteItem[];
	value: string;
	onChange: (value?: string) => void;
}

const getItemsToShow = (items: readonly AutocompleteItem[], value: string) => {
	if (value === '') {
		return [];
	}
	const filtered = matchSorter(items, value, {
		keys: ['value'],
		threshold: matchSorter.rankings.WORD_STARTS_WITH,
	});
	if (filtered.length === items.length) {
		return [];
	}
	return filtered.slice(0, MAX_ITEMS_TO_SHOW);
};

function ItemContainer({
	isHighlighted,
	...props
}: { isHighlighted: boolean } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={`
     flex cursor-pointer items-center gap-3 px-3 py-1 font-ui text-base
     font-bold
     ${isHighlighted ? `bg-accent text-background` : `bg-transparent`}
   `}
			{...props}
		/>
	);
}

export function SearchForm({ items, value, onChange }: Props) {
	const isEnabled = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	);
	const itemsToShow = getItemsToShow(items, value);
	const {
		getLabelProps,
		getInputProps,
		getMenuProps,
		getItemProps,
		highlightedIndex,
		closeMenu,
		isOpen,
	} = useCombobox({
		items: itemsToShow,
		inputValue: value,
		selectedItem: null,
		itemToString: (item) => item?.value ?? '',
		onInputValueChange: ({ inputValue }) => {
			onChange(inputValue);
		},
		onSelectedItemChange: ({ selectedItem }) => {
			if (selectedItem === null) {
				return;
			}
			if (selectedItem.type === 'recipe' && selectedItem.recipe) {
				window.location.href = `${window.location.origin}/recipes/${selectedItem.recipe.slug}/`;
				return;
			}
			onChange(selectedItem.value);
		},
	});
	const handleSubmit: SubmitEventHandler = (e) => {
		closeMenu();
		e.preventDefault();
	};
	return (
		<form role="search" onSubmit={handleSubmit}>
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label className="sr-only" {...getLabelProps()}>
				Search recipes
			</label>
			<div className="relative">
				<input
					className="
       w-full appearance-none rounded-none border-2 border-text bg-background
       p-3 font-ui text-lg font-bold text-text transition-all
       duration-(--duration-hover) ease-hover
       focus:border-accent focus:shadow-input focus:outline-0
       disabled:opacity-25
       [&::-webkit-search-cancel-button]:hidden
       [&::-webkit-search-decoration]:hidden
     "
					disabled={isEnabled === false}
					{...getInputProps({ type: 'search', placeholder: 'Search recipes' })}
				/>
				<div
					{...getMenuProps()}
					className="
       absolute inset-x-0 z-50 mt-3 rounded-none border-2 border-accent
       bg-background p-2 shadow-popover transition-all duration-150 ease-fade
       will-change-[opacity]
       empty:opacity-0
     "
				>
					{isOpen &&
						itemsToShow.map((item, index) => {
							const hl = highlightedIndex === index;
							const ip = getItemProps({ item, index });
							if (item.type === 'recipe' && item.recipe) {
								return (
									<ItemContainer key={item.value} isHighlighted={hl} {...ip}>
										{item.recipe.thumbnailUrl && (
											<div className="size-9 shrink-0 bg-light">
												<img
													src={item.recipe.thumbnailUrl}
													alt=""
													loading="lazy"
													className="size-full object-cover"
												/>
											</div>
										)}
										<div className="flex flex-col">
											<span>{item.recipe.title}</span>
											<span className="-mt-2 text-xs">Open recipe</span>
										</div>
									</ItemContainer>
								);
							}
							return (
								<ItemContainer key={item.value} isHighlighted={hl} {...ip}>
									{item.value}
								</ItemContainer>
							);
						})}
				</div>
			</div>
		</form>
	);
}
