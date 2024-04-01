import { Children, type ReactNode } from 'react';
import typo from '../util/typo';

type TypoProps = {
	children: ReactNode;
};

/**
 * Enhance typography
 */
export function Typo({ children }: TypoProps) {
	return Children.map(children, (child) => {
		if (typeof child === 'string' && child.trim() !== '') {
			const result = typo(child);
			if (result.includes('<')) {
				// Use dangerouslySetInnerHTML when the result contains HTML
				// (for example, <nobr>
				return <span dangerouslySetInnerHTML={{ __html: result }} />;
			} else {
				return result;
			}
		} else {
			return child;
		}
	});
}
