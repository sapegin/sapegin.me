import type { ReactNode } from 'react';
import { Image } from '../components/Image';
import { Typo } from './Typo';

interface Props {
	children: ReactNode;
}

export function About({ children }: Props) {
	return (
		<section
			className="
     flex flex-col gap-8
     md:flex-row
   "
		>
			<div
				className="
      mx-auto shrink-0
      md:mx-0
    "
			>
				<Image
					src="/images/artem-sapegin.avif"
					alt="Artem Sapegin"
					width={200}
					height={200}
					className="rounded-full"
				/>
			</div>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">About the author</h2>
					<p className="typo-body">Hola! I’m Artem.</p>
					<p className="typo-body">
						<Typo>
							I’m a software engineer with 20 years of experience in small
							startups and large corporations, like Wayfair, Mail.ru, Here
							Technologies, Omio, Stage+, and Badoo. I created React
							Styleguidist (a tool to create React components and share them
							with your team), among many other open source projects.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>{children}</Typo>
					</p>
				</div>
			</div>
		</section>
	);
}
