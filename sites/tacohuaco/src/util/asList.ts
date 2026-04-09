export function asList(
	list: readonly (string | false | undefined | null)[]
): string {
	const filtered = list.filter((x) => typeof x === 'string').map(String);

	if (filtered.length === 0) {
		return '';
	}

	return filtered.reduce((acc, item, index) => {
		return [acc, index === list.length - 1 ? ' and ' : ', ', item].join('');
	});
}
