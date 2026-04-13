import random from 'lodash/random';
import sample from 'lodash/sample';
import { type ComponentProps } from 'react';
import {
	EYES,
	FILLINGS,
	GLASSES,
	MOUTHES,
	NOSES,
	Taco,
	TORTILLAS,
} from './Taco';

const TORTILLA_NAMES = Object.keys(TORTILLAS) as (keyof typeof TORTILLAS)[];
const FILLING_NAMES = Object.keys(FILLINGS) as (keyof typeof FILLINGS)[];
const EYES_NAMES = Object.keys(EYES) as (keyof typeof EYES)[];
const NOSE_NAMES = Object.keys(NOSES) as (keyof typeof NOSES)[];
const MOUTH_NAMES = Object.keys(MOUTHES) as (keyof typeof MOUTHES)[];
const GLASSES_NAMES = Object.keys(GLASSES) as (keyof typeof GLASSES)[];

const EYES_FOR_GLASSES: (keyof typeof EYES)[] = ['small'];

const getTacoProps = (): ComponentProps<typeof Taco> => {
	const eyes = sample(EYES_NAMES);
	const glasses =
		eyes && EYES_FOR_GLASSES.includes(eyes) && random() > 0.8
			? sample(GLASSES_NAMES)
			: undefined;
	return {
		tortilla: sample(TORTILLA_NAMES),
		filling: sample(FILLING_NAMES),
		eyes,
		nose: sample(NOSE_NAMES),
		mouth: sample(MOUTH_NAMES),
		glasses,
	};
};

export function Logo() {
	return (
		<a
			href="/"
			className="
     group mx-auto rounded-normal focus-outline
     md:mx-0
   "
		>
			<span className="-mt-2 -mr-2 flex items-center gap-1">
				<Taco height={34} {...getTacoProps()} />
				<span
					className="
       mt-2 p-2 typo-menu font-bold text-accent no-underline transition-all
       duration-(--duration-hover) ease-hover
       group-hover:bg-accent group-hover:text-background
     "
				>
					Tacohuaco
				</span>
			</span>
		</a>
	);
}
