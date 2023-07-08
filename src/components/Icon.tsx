import { vars } from '../styles/theme.css';
import { Icon as IconBase } from '../tamia';

type IconInfo = {
	path?: string;
	children?: React.ReactElement;
};

const BASE_SIZE = 20;
const DEFAULT_SIZE = 20;
const ICONS: Record<string, IconInfo> = {
	mail: {
		path: 'M12.05 11.055H8.022v1.963h4.028v-1.963Zm-4-2.041h-2v1.959h2V9.014Zm6 0h-2v1.959h2V9.014Zm-8-2h-2v1.959h2V7.014Zm10 0h-2v1.959h2V7.014ZM2.05 16V6.973h2V5.014h-2v-.988H0v11.997h2.05v2.003h15.998v-2.003h2.002V4.026h-2.002V2H2.05v2.026H18v.988h-1.95v1.959H18V16H2.05Z',
	},
	comment: {
		path: 'M2.072 13.971h1.995V18h4.018v-1.983h1.978v-2.046H8.067v2.046H6.063v-4.038H2.072v1.992ZM18 11.979h-7.937v1.992h7.994v-1.992H20V3.985h-1.929V2H2.072v1.985H18v7.994ZM2 3.985H0v7.994h2V3.985Z',
	},
	twitter: {
		path: 'M4.03 18H10v-1h2.021v-1H13v-1h1v-1h1v-2h1V9h1V8h1.018V6.977H20v-.965h-1.982V5H20V4h-4V3h-1V2h-3v1h-.998v1H10v1.012H8.979V7H4.994V5.977h-1v-.965h-.995V5H3V4H1v1h1.014v2h.985v2.032h-.985V10h.985v.977h.995v1.05h-.995v1.02h.995v.93h1v1.052H1v.998h1.014v.978H4.03V18Z',
	},
	mastodon: {
		path: 'M14.004 2V1H5.983v1H3.955v1.032h-.944v.994h-.996V6H1v6.958h1.034v2.08H3V16h1v1.04h1V18h1v1.072h6V18h2v-2h-2v1.04H7.957V16H7v-2h.957v1h6.047v-1H16v-.968h.973V12H18v-2h1V6h-1V4.026h-1.027v-.994h-1.018V2h-1.951ZM8.996 4H5.985v.999h-.969V12h2.027V7.013h2.035v3.01h1.965v-3.01h2.035V12H15V4.999h-.996V4H10.98v.999H8.996V4Z',
		children: (
			<path
				fill={vars.colors.bg}
				d="M14 5V4h-3v1H9V4H6v1H5v7h2V7.029h2V10h2V7.028v.001h2V12h2V5h-1Z"
			/>
		),
	},
	github: {
		path: 'M11.959 2.014V1H8v1.014H6.001v1.01h-.989v.996H4.05v.995H3.014v1.007h-1v2.027H1v5h1.014v1.924h1v1.058H4.05v1.027H5v.883h1.038V19h7.99v-1.059H15v-.883h1.025v-1.027h.984v-1.058h.978v-1.924H19v-5h-1.013V6.022h-.978V5.015h-.984V4.02h-1.038v-.996h-.966v-1.01h-2.062Z',
		children: (
			<path
				fill={vars.colors.bg}
				d="M11.043 14.009h3v-1.017h.929v-1.007h1.041V9.004h-1.041V8h-.929v-.982h1V5.034H13v1h-1v.977h-.957v-.977H9v.977h-.957v-.977h-1v-1H5v1.984h1V8H5v1.004h-.99v2.981H5v1.007h1v1.017h3v1h-.99v1.012H6.02v-1.012h-1v-1H4.01v2.024h1v1h3V19H12v-3.991h-.957v-1Z"
			/>
		),
	},
	devto: {
		path: 'M18.022 2.043V1H2.025v1.043H1V18.01h1.025V19h15.997v-.99H19V2.043h-.978Z',
		children: (
			<>
				<path
					fill={vars.colors.bg}
					d="M9 7.008H7.988v6H9v1h2.956v-2H10v-1h1.956v-2H10v-1h1.956v-2H9v1Zm-2.968 0v-1h-4v8h4v-1H7v-6h-.968ZM12.988 10h1v3H15v.998h.988V13H17v-2.992h1v-4h-2.012V10H15V6h-2.012v4Zm-8-1.992h-.984v4h.984v-4ZM24 5.343h-2.012v2.656H24V5.343Z"
				/>
				<rect fill="currentColor" x="4" y="8" width="1" height="4" />
			</>
		),
	},
};

export type IconName = keyof typeof ICONS;

type Props = {
	icon: IconName;
	size?: number;
};

export function Icon({ icon, size = DEFAULT_SIZE }: Props) {
	const { path, children } = ICONS[icon];
	return (
		<IconBase
			viewBox={{
				width: BASE_SIZE,
				height: BASE_SIZE,
			}}
			width={size}
			height={size}
		>
			{path && <path d={path} />}
			{children}
		</IconBase>
	);
}
