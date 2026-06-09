// TODO: Can we merge <div> and <a>?

export function Logo() {
	return (
		<div className="typo-menu">
			<a
				href="/"
				className="from-gradient-1 to-gradient-2 text-primary focus-outline ease-hover hover:from-accent hover:to-primary inline-block bg-linear-to-b bg-clip-text font-bold no-underline transition-all duration-(--duration-hover) [-webkit-text-fill-color:transparent] hover:underline"
			>
				Morning.photos
			</a>
		</div>
	);
}
