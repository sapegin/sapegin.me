import startCase from 'lodash/startCase';
import { getCuisineEmoji } from '../util/emojis';

interface Props {
	cuisine: string;
	underline?: boolean;
}

export function CuisineName({ cuisine, underline }: Props) {
	return (
		<span className="inline-flex flex-row gap-2">
			<span aria-hidden="true">{getCuisineEmoji(cuisine)}</span>
			{underline ? (
				<u>{startCase(cuisine)} <span className="sr-only">cuisine</span></u>
			) : (
				<span>{startCase(cuisine)} <span className="sr-only">cuisine</span></span>
			)}
		</span>
	);
}
