import { Nobr } from '.';

type Props = {
	date: Date;
};

function formatDate(date: Date) {
	if (date.getFullYear() === new Date().getFullYear()) {
		return date.toLocaleDateString(undefined, {
			month: 'long',
			day: 'numeric',
		});
	} else {
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
}

export function FormattedDate({ date }: Props) {
	return <Nobr>{formatDate(date)}</Nobr>;
}
