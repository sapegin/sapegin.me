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
		<a href="/" className="
    mx-auto -mt-6 -mb-0.5 quoted-link
    md:mx-0
  ">
			<span className="flex flex-row items-center gap-3 pt-3">
				<span className="-mt-2.5 pb-3">
					<Taco height={34} {...getTacoProps()} />
				</span>
				<span
					className="
       duration-hover mb-2 rounded-none border-0 border-solid border-accent
       bg-background font-ui text-base/heading font-bold tracking-menu
       text-accent uppercase no-underline transition-all ease-hover
       group-hover:border-b-2
     "
				>
					Tacohuaco
				</span>
			</span>
		</a>
	);
}
