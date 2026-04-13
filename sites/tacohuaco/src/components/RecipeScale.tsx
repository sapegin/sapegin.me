interface Props {
	onLess: () => void;
	onMore: () => void;
}

export function RecipeScale({ onLess, onMore }: Props) {
	return (
		<div
			className="
     flex min-w-0 flex-row items-center gap-3
     md:gap-2
   "
		>
			<button
				onClick={onLess}
				aria-label="Less"
				className="
      inline-block size-8 rounded-full border-2 border-accent bg-transparent p-0
      pt-[0.1em] text-center font-body text-xl leading-none font-normal
      text-accent
      hover:cursor-pointer hover:bg-accent hover:text-background
      focus-visible:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-accent)]
      focus-visible:outline-0
      active:bg-accent active:text-background
      disabled:pointer-events-none disabled:opacity-50
      [@media(any-hover:hover)]:size-5 [@media(any-hover:hover)]:text-sm
      [@media(any-hover:hover)]:font-bold
    "
			>
				－
			</button>
			<button
				onClick={onMore}
				aria-label="More"
				className="
      inline-block size-8 rounded-full border-2 border-accent bg-transparent p-0
      pt-[0.1em] text-center font-body text-xl leading-none font-normal
      text-accent
      hover:cursor-pointer hover:bg-accent hover:text-background
      focus-visible:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-accent)]
      focus-visible:outline-0
      active:bg-accent active:text-background
      disabled:pointer-events-none disabled:opacity-50
      [@media(any-hover:hover)]:size-5 [@media(any-hover:hover)]:text-sm
      [@media(any-hover:hover)]:font-bold
    "
			>
				＋
			</button>
		</div>
	);
}
