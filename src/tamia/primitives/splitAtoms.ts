// HACK: vanilla-extract doesn't export types so we need to recreate a minimum set
type AtomProps = Record<string, unknown>;
type Atoms = ((props: AtomProps) => string) & {
	properties: Set<keyof AtomProps>;
};

export function splitAtoms(props: Record<string, unknown>, atoms: Atoms) {
	const atomProps: Record<string, unknown> = {};
	const otherProps: Record<string, unknown> = {};

	for (const key in props) {
		if (atoms.properties.has(key as any)) {
			atomProps[key] = props[key];
		} else {
			otherProps[key] = props[key];
		}
	}

	return { atomProps, otherProps };
}
