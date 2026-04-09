import { expect,test } from 'vitest';
import { splitBySection } from '../splitBySection';

test('markdown without sections', () => {
	const markdownWithoutSections = `
- 1 kg of floury potatoes
- 2 bay leaves
- 4 tablespoons of butter
- 1 egg
- a cup of milk
- smoked paprika powder
- salt
- freshly ground black pepper
`;
	expect(splitBySection(markdownWithoutSections)).toMatchInlineSnapshot(`
		[
		  {
		    "body": "
		- 1 kg of floury potatoes
		- 2 bay leaves
		- 4 tablespoons of butter
		- 1 egg
		- a cup of milk
		- smoked paprika powder
		- salt
		- freshly ground black pepper

		",
		    "name": "",
		  },
		]
	`);
});

test('markdown with sections', () => {
	const markdownWithSections = `
### For the mashed potatoes

- 1 kg of floury potatoes
- 2 bay leaves
- 4 tablespoons of butter
- 1 egg
- a cup of milk
- smoked paprika powder
- salt
- freshly ground black pepper

### For the filling

- 1 red onion
- 6 cloves of garlic
- 2 chiles
- 2 carrots
- 1 zucchini
- a handful of green beans
- a handful of sugar peas
- 2 teaspoons kimchi paste
- 200 g ground beef
- 200 g ground pork
- soy sauce
- salt
`;
	expect(splitBySection(markdownWithSections)).toMatchInlineSnapshot(`
		[
		  {
		    "body": "
		- 1 kg of floury potatoes
		- 2 bay leaves
		- 4 tablespoons of butter
		- 1 egg
		- a cup of milk
		- smoked paprika powder
		- salt
		- freshly ground black pepper

		",
		    "name": "For the mashed potatoes",
		  },
		  {
		    "body": "
		- 1 red onion
		- 6 cloves of garlic
		- 2 chiles
		- 2 carrots
		- 1 zucchini
		- a handful of green beans
		- a handful of sugar peas
		- 2 teaspoons kimchi paste
		- 200 g ground beef
		- 200 g ground pork
		- soy sauce
		- salt

		",
		    "name": "For the filling",
		  },
		]
	`);
});

test('markdown with subrecipes', () => {
	const markdownWithSubrecipes = `
### For the gremolata

[#](spicy-gremolata)

### For the potatoes

- 1 kg of small new potatoes
- olive oil
- salt
- freshly ground black pep
`;
	expect(splitBySection(markdownWithSubrecipes)).toMatchInlineSnapshot(`
		[
		  {
		    "body": "
		[#](spicy-gremolata)

		",
		    "name": "For the gremolata",
		  },
		  {
		    "body": "
		- 1 kg of small new potatoes
		- olive oil
		- salt
		- freshly ground black pep

		",
		    "name": "For the potatoes",
		  },
		]
	`);
});
