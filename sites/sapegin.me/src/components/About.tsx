import { Markdown } from '@shared/components/Markdown';
import { BlockProse } from './BlockProse';

interface Props {
	bio: string;
	extra?: string;
}

export function About({ bio, extra }: Props) {
	return (
		<section className="flex flex-col gap-8 md:flex-row">
			<div className="mx-auto shrink-0 md:mx-0">
				<img
					src="/images/artem-sapegin.avif"
					alt="Artem Sapegin"
					width={200}
					height={200}
					className="image rounded-full"
					loading="lazy"
				/>
			</div>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">About the author</h2>
					<BlockProse>
						<Markdown text={bio} forceBlock />
						{extra && <Markdown text={extra} forceBlock />}
					</BlockProse>
				</div>
			</div>
		</section>
	);
}
