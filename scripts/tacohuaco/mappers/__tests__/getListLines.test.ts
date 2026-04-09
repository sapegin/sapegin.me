import { expect,test } from 'vitest';
import { getListLines } from '../getListLines';

test('return an array of ingredient lines from Markdown', () => {
	const markdown = `
- 10 sausages
- 1 onion
- 1/2 sausage
- 13 g of cocaine
- 4 medium eggs
- 3-4 sprigs of marijuana
- 1 clove of garlic
- a bit of hot pepper
		`;
	expect(getListLines(markdown)).toMatchInlineSnapshot(`
		[
		  "10 sausages",
		  "1 onion",
		  "1/2 sausage",
		  "13 g of cocaine",
		  "4 medium eggs",
		  "3-4 sprigs of marijuana",
		  "1 clove of garlic",
		  "a bit of hot pepper",
		]
	`);
});
