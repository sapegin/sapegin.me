import { IconBase } from 'tamia/dist/components/IconBase.js';

const SIZE = 34;

export function IconCrow() {
	return (
		<IconBase
			viewBox={{
				width: SIZE,
				height: SIZE,
			}}
			className="size-8.5"
		>
			<path d="M14 32h-2v1.958h2V32Zm-6 0H6v1.958h2V32Zm8-32h-6v2H8v2H6v2H2v2H0v2h6v2H4v10h2v2h2v8h2v-4h4v4h2v-4h8v2h2v2h8v-2h-2v-2h-2v-6h-2v-4h-2v-2h-2v-2h-2v-2h-2V6h-2V2h-2V0Z" />
			<path d="M10 5h2v2.027h-2z" className="fill-accent" />
		</IconBase>
	);
}

export function MurderOfCrows() {
	return (
		<div
			// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
			role="separator"
			className="border-light mx-auto w-1/2 border-b pr-6 text-right"
		>
			<IconCrow />
		</div>
	);
}
