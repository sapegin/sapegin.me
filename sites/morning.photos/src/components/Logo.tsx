// TODO: Can we merge <div> and <a>?

export function Logo() {
	return (
		<div className="typo-menu">
			<a
				href="/"
				className="
      inline-block bg-linear-to-b from-gradient-1 to-gradient-2 bg-clip-text
      font-bold text-primary no-underline focus-outline transition-all
      duration-(--duration-hover) ease-hover
      [-webkit-text-fill-color:transparent]
      hover:from-accent hover:to-primary hover:underline
    "
			>
				Morning.photos
			</a>
		</div>
	);
}
