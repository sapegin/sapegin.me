// WARNING: The even position is a plural (there may be more than one), so if
// there's no plural but there are alternatives, you should repeat the first
// array item twice. Each array is an alternative spelling. The first array is
// the preferred spelling.
//
// Examples:
// [['boob', 'boobs'], ['tit', 'tits', 'tit', 'titties']]
// [['chorizo', 'chorizo']]
export const INGREDIENTS = [
	/*
	 * Spices
	 */
	[['salt']],
	[['black pepper']],
	[['star anise', 'star anise', 'star anis']],
	[['bay leaf', 'bay leaves']],
	[['rosemary seeds']],
	[['dried rosemary']],
	[['cumin seeds', 'cumin seeds'], ['cumin']],
	[['sunflower seeds']],
	[['sesame seeds']],
	[
		['pumpkin seeds', 'pumpkin seeds'],
		['pepita', 'pepitas'],
	],
	[['cinnamon']],
	[
		['cardamom pod', 'cardamom pods'],
		['cardamon pod', 'cardamon pods'],
	],
	[['nutmeg']],
	[
		['chile flakes', 'chile flakes'],
		['chili flakes', 'chili flakes'],
		['chilli flakes', 'chilli flakes'],
	],
	[['paprika powder']],
	[['curry powder']],
	[['curcuma powder']],
	[['turmeric powder']],
	[['peppercorn', 'peppercorns']],
	// FIXME: Doesn't recognise as an ingredient
	[['clove', 'cloves']],

	/*
	 * Oils and sauces
	 */
	[
		['olive oil', 'olive oil'],
		['extra virgin olive oil', 'extra-virgin olive oil'],
	],
	[['coconut oil']],
	[['sunflower oil']],
	[['oil']],
	[['soy sauce']],
	[['fish sauce']],
	[['oyster sauce']],
	[['vinegar']],
	[['mustard']],
	[['tomato paste']],
	[['olive', 'olives']],
	[['caper', 'capers']],

	/*
	 * Legumes and pasta
	 */
	[['bean', 'beans']],
	[['chickpea', 'chickpeas']],
	[['buckwheat']],
	[['rice noodle', 'rice noodles']],
	[['noodle', 'noodles']],
	[['rice']],
	[['pasta']],
	[['couscous']],
	[['oat', 'oats']],
	[
		['garrofó bean', 'garrofó beans'],
		['garrofo bean', 'garrofo beans'],
		['garrofo', 'garrofos'],
	],

	/*
	 * Dried fruits and nuts
	 */
	[['dried apricot', 'dried apricots']],
	[['dried cranberry', 'dried cranberries']],
	[['nut', 'nuts']],
	[['peanut', 'peanuts']],
	[['raisin', 'raisins']],
	[['date', 'dates']],
	[['almond', 'almonds']],
	[['pecan', 'pecans']],

	/*
	 * Vegetables
	 */
	[
		['beetroot', 'beetroots'],
		['red beet', 'red beets'],
		['beet', 'beets'],
	],
	[
		['bell pepper', 'bell peppers'],
		['paprika', 'paprikas'],
	],
	[['pepper', 'peppers']],
	[
		['napa cabbage', 'napa cabbages'],
		['chinese cabbage', 'chinese cabbages'],
	],
	[['red cabbage', 'red cabbages']],
	[['savoy cabbage', 'savoy cabbages']],
	[['white cabbage', 'white cabbages']],
	[['cabbage', 'cabbages']],
	[['lamb’s lettuce', 'lamb’s lettuces', "lamb's lettuce", "lamb's lettuces"]],
	[['lettuce', 'lettuces']],
	[
		['broad bean', 'broad beans'],
		['fava bean', 'fava beans'],
		['faba bean', 'faba beans'],
	],
	[['green bean', 'green beans']],
	[
		['runner bean', 'runner beans'],
		['scarlet runner bean', 'scarlet runner beans'],
		['multiflora bean', 'multiflora beans'],
		['butter bean', 'butter beans'],
	],
	[
		['sweet corn', 'sweet corns'],
		['sweetcorn', 'sweetcorns'],
		['sugar corn', 'sugar corns'],
		['pole corn', 'pole corns'],
	],
	[['corn', 'corns']],
	// This is a recipe, so both names should match its name for proper linking
	[['pickled onions', 'pickled onions']],
	[
		['scallion', 'scallions'],
		['green onion', 'green onions'],
		['spring onion', 'spring onions'],
	],
	[['onion', 'onions']],
	[
		['kohlrabi', 'kohlrabis', 'kohlrabies'],
		['german turnip', 'german turnips'],
	],
	[['turnip', 'turnips']],
	[['cucumber', 'cucumbers']],
	[
		['bok choi', 'bok choi'],
		['pak choi'],
		['pok choi'],
		['pichay'],
		['petsay'],
	],
	[['potato', 'potatoes']],
	[['young potato', 'young potatoes']],
	[['sweet potato', 'sweet potatoes']],
	[['tomato', 'tomatoes']],
	[
		['eggplant', 'eggplants'],
		['aubergine', 'aubergines'],
	],
	[['carrot', 'carrots']],
	[['young carrot', 'young carrots']],
	[
		['mangold', 'mangolds'],
		['chard', 'chards'],
		['swiss chard', 'swiss chards'],
		['silver beet', 'silver beets'],
		['perpetual spinach', 'perpetual spinaches'],
		['beet spinach', 'beet spinaches'],
		['seakale beet', 'seakale beets'],
		['leaf beet', 'leaf beets'],
	],
	[
		['chile de árbol', 'chiles de árbol'],
		['chile de arbol', 'chiles de arbol'],
	],
	[
		// https://www.thespruceeats.com/different-spellings-of-chile-2342844
		['chile', 'chiles'],
		['chili', 'chilies', 'chili', 'chilis'],
		['chilli', 'chillies'],
	],
	[['pea', 'peas']],
	[['pumpkin', 'pumpkins']],
	[['squash', 'squashes']],
	[
		['zucchini', 'zucchinis'],
		['courgette', 'courgettes'],
	],
	[['black radish', 'black radishes']],
	[['radish', 'radishes']],
	[['chicory', 'chicories']],
	[
		['rutabaga', 'rutabagas'],
		['swede', 'swedes'],
	],
	[['asparagus', ' asparaguses', 'asparagusses', 'asparagi']],
	[['mushroom', 'mushrooms']],
	[['parsley root', 'parsley roots']],
	[['parsley']],
	[['basil']],
	[['dill']],
	[['rosemary']],
	[['garlic']],
	[['kale', 'kales']],
	[['iceberg salad', 'iceberg salad', 'iceberg']],
	[['salsify', 'salsifies']],
	[['jalapeño', 'jalapeños', 'jalapeno', 'jalapenos']],
	[['spinach', 'spinaches']],
	[['broccoli', 'broccolis']],
	[
		['celeriac', 'celeriacs'],
		['celery root', 'celery roots'],
	],
	[['celery', 'celeries']],
	[['fennel', 'fennels']],
	[
		['rucola', 'rucola'],
		['rocket', 'rockets'],
		['arugula', 'arugulas'],
	],
	[['cauliflower', 'cauliflowers']],
	[['parsnip', 'parsnips']],
	[['brussels sprout', 'brussels sprouts']],
	[['ginger']],
	[['horseradish']],
	[['avocado', 'avocados']],

	/*
	 * Fruits
	 */
	[
		['blackcurrant', 'blackcurrants', 'black currant', 'black currants'],
		['cassis', 'cassises'],
	],
	[['redcurrant', 'redcurrants', 'red currant', 'red currants']],
	[['currant', 'currants']],
	[
		['mandarin', 'mandarins', 'mandarine', 'mandarines'],
		['tangerine', 'tangerines'],
		['clementine', 'clementines', 'clementines'],
	],
	[['apple', 'apples']],
	[['apricot', 'apricots']],
	[['banana', 'bananas']],
	[['blueberry', 'blueberries']],
	[['blackberry', 'blackberries']],
	[['gooseberry', 'gooseberries']],
	[['cherry', 'cherries']],
	[['cranberry', 'cranberries']],
	[['grapefruit', 'grapefruits']],
	[['lemon', 'lemons']],
	[['lime', 'limes']],
	[['orange', 'oranges']],
	[['plum', 'plums']],
	[['pear', 'pears']],
	[['grape', 'grapes']],
	[['quince', 'quinces']],
	[['watermelon', 'watermelons']],
	[['raspberry', 'raspberries']],
	[['strawberry', 'strawberries']],
	[
		['elderberry', 'elderberries'],
		['elder', 'elders'],
	],
	[['fruit', 'fruits']],
	[['rhubarb', 'rhubarbs']],

	/*
	 * Dairy
	 */
	[
		[
			'parmesan cheese',
			'parmesan cheese',
			'parmesan',
			'parmigiano-reggiano cheese',
			'parmigiano-reggiano',
			'parmigiano cheese',
			'parmigiano',
		],
	],
	[['cheese']],
	[
		[
			'cottage cheese (tvorog)',
			'cottage cheese (tvorog)',
			'cottage cheese',
			'tvorog',
		],
	],
	[['crème fraîche', 'crème fraîche', 'creme fraiche']],
	[['butter', 'butter', 'unsalted butter']],
	[['milk chocolate']],
	[['whipping cream', 'whipping cream']],

	/**
	 * Meat and fish
	 */
	[['chicken chorizo', 'chicken chorizos']],
	[['chicken broth', 'chicken broth', 'chicken stock']],
	[['chicken leg', 'chicken legs']],
	[['chicken wing', 'chicken wings']],
	[['chicken thigh', 'chicken thighs']],
	[['chicken breast', 'chicken breasts']],
	[['chicken']],
	[
		['pork chorizo', 'pork chorizos'],
		['chorizo', 'chorizos'],
	],
	[['pork']],
	[['beef']],
	[['salmon']],
	[['sausage', 'sausages']],
	[['ham']],
	[['meat']],

	/*
	 * Flours
	 */
	[['buckwheat flour']],
	[['teff flour']],
	[['almond flour']],
	[['coconut flour']],
	[['bamboo flour']],
	[['hazelnut flour']],
	[['chestnut flour']],
	[['potato peel flour']],
	[['flaxseed flour', 'flaxseed flour', 'flax seed flour']],
	[['oat flour', 'oat flour', 'oatmeal flour']],
	[['spelt flour']],
	[
		['all-purpose flour', 'all-purpose flour', 'all purpose flour'],
		['wheat flour'],
	],
	[['corn starch', 'corn starch', 'cornstarch']],
	[['flour']],

	/*
	 * Baking and sweeteners
	 */
	[['baking powder']],
	[['yeast']],
	[['date sugar']],
	[['coconut sugar']],
	[['sugar']],
	[['maple syrup']],
	[['chicory syrup']],
	[['vanilla extract']],
	[['honey']],
	[['cocoa powder', 'cocoa powder', 'cacao powder']],

	/*
	 * Misc
	 */
	[['chocolate']],
	[['burger bun', 'burger buns']],
	[['egg', 'eggs']],
	[['vodka']],
	[['marmalade']],
	[['kimchi paste']],
	[['wheat tortilla', 'wheat tortillas']],
	[['tortilla', 'tortillas']],
];

export const ALL_INGREDIENTS = INGREDIENTS.map((x) => x.flat());
