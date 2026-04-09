import { Icon } from './Icon';
import { Tooltip, TooltipTrigger } from './Tooltip';

interface Props {
	time: number;
	overnight?: boolean;
	size?: 'medium' | 'small';
}

const MoonIcon = () => (
	<span className="align-[0.15ex] text-moon">
		<Icon icon="moon" width="1em" height="1em" />
	</span>
);

export function RecipeTimes({ time, overnight, size = 'medium' }: Props) {
	if (size === 'small') {
		return (
			<p className="font-ui text-xs/normal">
				{time} m
				{overnight && (
					<>
						{' '}
						<Tooltip value="Requires preparation the day before">
							{({ tooltipNode }) => (
								<TooltipTrigger>
									{tooltipNode}
									<MoonIcon />
								</TooltipTrigger>
							)}
						</Tooltip>
					</>
				)}
			</p>
		);
	}

	return (
		<p className="font-ui text-xs/normal">
			{time} min
			{overnight && (
				<>
					, requires preparation the day before <MoonIcon />
				</>
			)}
		</p>
	);
}
