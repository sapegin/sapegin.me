export function getPhotoId(filename: string) {
	const match = filename.match(/\/photos\/(.*?)\./);
	if (match === null) {
		return '';
	}
	return match[1].replace('_Artem_Sapegin', '').replace('_IMG', '');
}
