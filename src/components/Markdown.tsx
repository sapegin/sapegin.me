import MarkdownToJsx, { type MarkdownToJSX } from 'markdown-to-jsx';
import typo from '../util/typo';

type Props = {
	text: string;
	overrides?: MarkdownToJSX.Options['overrides'];
	forceBlock?: boolean;
};

export function Markdown({ text, overrides = {}, forceBlock = false }: Props) {
	const textTypo = typo(text);
	return (
		<MarkdownToJsx options={{ overrides, forceBlock }}>
			{textTypo}
		</MarkdownToJsx>
	);
}
