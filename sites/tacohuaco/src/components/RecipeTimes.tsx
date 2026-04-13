import { Icon } from './Icon';

interface Props {
	time: string;
	overnight?: boolean;
	size?: 'medium' | 'small';
}

const MoonIcon = () => (
	<span className="align-[0.15ex] text-moon">
		<Icon icon="moon" className="size-3" />
	</span>
);

export function RecipeTimes({ time, overnight, size = 'medium' }: Props) {
	if (size === 'small') {
		return (
			<p className="typo-small-ui">
				{time}
				{overnight && (
					<span
						title="Requires preparation the day before"
						className="ml-1 inline-block"
					>
						<span className="sr-only">Requires preparation the day before</span>
						<MoonIcon />
					</span>
				)}
			</p>
		);
	}

	return (
		<p className="typo-small-ui">
			{time}
			{overnight && (
				<>
					, requires preparation the day before <MoonIcon />
				</>
			)}
		</p>
	);
}
