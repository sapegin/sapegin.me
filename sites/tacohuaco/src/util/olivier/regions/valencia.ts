// Data from:
// https://www.visitvalencia.com/en/what-to-do-valencia/gastronomy/seasonal-products
// https://www.azada.co.uk/blog/know-how-to-eat-like-a-local-seasonal-vegetables-in-spain/
// Changes:
// - list "potato" and "carrot" as "young potato" and "young carrot"
// - remove some common ingredients such as "bell pepper" or "lime"

import { Month } from '../types.ts';

const Jan = Month.January;
const Feb = Month.February;
const Mar = Month.March;
const Apr = Month.April;
const May = Month.May;
const Jun = Month.June;
const Jul = Month.July;
const Aug = Month.August;
const Sep = Month.September;
const Oct = Month.October;
const Nov = Month.November;
const Dec = Month.December;

// prettier-ignore
export const SEASONS: Record<string, Month[]> = {
	[`apple`]:        [ Jan,                               Aug, Sep, Oct, Nov, Dec ],
	[`apricot`]:      [                     May, Jun, Jul, Aug                     ],
	[`artichoke`]:    [           Mar, Apr, May                                    ],
	[`asparagus`]:    [           Mar, Apr, May                                    ],
	[`avocado`]:      [ Jan, Feb, Mar, Apr,                               Nov, Dec ],
	[`beetroot`]:     [                               Jul, Aug, Sep, Oct, Nov      ],
	[`blackberry`]:   [                                    Aug                     ],
	[`blueberry`]:    [                          Jun, Jul,                         ],
	[`broccoli`]:     [                                              Oct, Nov, Dec ],
	[`cabbage`]:      [ Jan, Feb, Mar,                          Sep, Oct, Nov, Dec ],
	[`young carrot`]: [                Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec ],
	[`cauliflower`]:  [ Jan, Feb, Mar,                               Oct, Nov, Dec ],
	[`celery`]:       [ Jan, Feb, Mar, Apr,                                    Dec ],
	[`cherry`]:       [                     May, Jun, Jul                          ],
	[`cucumber`]:     [                          Jun, Jul, Aug, Sep                ],
	[`eggplant`]:     [                               Jul, Aug, Sep                ],
	[`garrofó bean`]: [                               Jul                          ],
	[`grape`]:        [                                         Sep, Oct, Nov, Dec ],
	[`grapefruit`]:   [                                                        Dec ],
	[`kiwi`]:         [ Jan, Feb, Mar,                               Oct, Nov, Dec ],
	[`leek`]:         [ Jan, Feb,                               Sep, Oct, Nov, Dec ],
	[`mandarin`]:     [                                                   Nov, Dec ],
	[`mango`]:        [                                    Aug, Sep, Oct, Nov      ],
	[`melon`]:        [                          Jun, Jul, Aug, Sep                ],
	[`nectarine`]:    [                     May, Jun, Jul, Aug, Sep                ],
	[`orange`]:       [ Jan, Feb, Mar, Apr,                               Nov, Dec ],
	[`papaya`]:       [                               Jul, Aug,                    ],
	[`peach`]:        [                     May, Jun, Jul, Aug, Sep                ],
	[`pear`]:         [                               Jul, Aug, Sep, Oct, Nov      ],
	[`plum`]:         [                          Jun, Jul, Aug                     ],
	[`persimmon`]:    [                                              Oct, Nov, Dec ],
	[`pomegranate`]:  [                                         Sep, Nov           ],
	[`young potato`]: [           Mar, Apr, May, Jun, Jul, Aug                     ],
	[`pumpkin`]:      [                                         Sep, Oct, Nov, Dec ],
	[`raspberry`]:    [                          Jun, Jul, Aug                     ],
	[`spinach`]:      [ Jan, Feb, Mar, Apr,                     Sep, Oct, Nov      ],
	[`strawberry`]:   [                Apr, May, Jun, Jul                          ],
	[`sweet potato`]: [                                              Oct, Nov      ],
	[`tomato`]:       [           Mar, Apr, May, Jun, Jul, Aug, Sep                ],
	[`turnip`]:       [                                                   Nov, Dec ],
	[`watermelon`]:   [                          Jun, Jul, Aug                     ],
	[`zucchini`]:     [                          Jun, Jul, Aug                     ],
};
