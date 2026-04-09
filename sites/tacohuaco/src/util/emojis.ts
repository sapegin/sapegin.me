const CUISINE_TO_EMOJI: Record<string, string> = {
	_DEFAULT: '🏴',
	Chinese: '🇨🇳',
	English: '🇬🇧',
	French: '🥖',
	Klatzlandian: '🏴‍☠️',
	Greek: '🇬🇷',
	Italian: '🍕',
	Japanese: '🇯🇵',
	Korean: '🇰🇷',
	Lebanese: '🇱🇧',
	Mediterranean: '🫒',
	Mexican: '🇲🇽',
	MiddleEastern: '🥙',
	Russian: '🪆',
	Spanish: '🇪🇸',
	Swedish: '🇸🇪',
	UnitedStates: '🇺🇸',
	Uzbek: '🇺🇿',
	Vietnamese: '🇻🇳',
};

export const getCuisineEmoji = (cuisine: string): string => {
	return CUISINE_TO_EMOJI[cuisine] || CUISINE_TO_EMOJI._DEFAULT;
};
