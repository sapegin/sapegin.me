import { BookCover } from './BookCover';
import { Feedback } from './Feedback';
import { PostAddon } from './PostAddon';

export function BookPostFooter() {
	return (
		<PostAddon>
			<div className="flex gap-4">
				<div className="flex flex-col gap-4">
					<Feedback github="washingcode-book">
						If you have any feedback, drop me a line at
					</Feedback>
					<p className="typo-body">
						<a className="link" href="/book/">
							Get the book now!
						</a>
					</p>
				</div>
				<a className="link" href="/book/">
					<BookCover image="washing-your-code" title="Washing your code" />
				</a>
			</div>
		</PostAddon>
	);
}
