import { vars } from '../styles/theme.css';
import { Icon as IconBase } from '../tamia';

const SIZE = 36;

type Props = {
	className?: string;
};

export function IconCoffee(props: Props) {
	return (
		<IconBase
			{...props}
			viewBox={{
				width: SIZE,
				height: SIZE,
			}}
			width={SIZE}
			height={SIZE}
			fill="url(#gradient) currentColor"
		>
			<linearGradient id="gradient" x1="0" x2="0" y1="1">
				{/* Use custom colors so they match the text next to the icon */}
				<stop offset="0%" stopColor="#766c90" />
				<stop offset="100%" stopColor="#aa608e" />
			</linearGradient>
			<path d="M26 18v-2H4v14.016h2v1.962h2.046V34H22v-2.022h2.046v-1.962H26v-4.025h4.05V18H26Zm-7-6h-2v2h2.024v-1.97h2v-6H19V12Zm-6 0h-2v2h2.024v-2h2V6H13v6Zm6.024-10H17v3.98h2.024V2Zm-6 0H11v3.98h2.024V2Z" />
			<path
				fill={vars.colors.bg}
				d="M26 20h2v4h-2zM8 30.018V32h14v-1.982h2V18H6v12.018h2Z"
			/>
		</IconBase>
	);
}
