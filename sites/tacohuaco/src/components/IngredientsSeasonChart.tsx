import orderBy from 'lodash/orderBy';
import upperFirst from 'lodash/upperFirst';
import { Month } from '../util/olivier';
import { SEASONS } from '../util/olivier/regions/valencia';

const CURRENT_SEASON = (new Date().getMonth() + 1) as Month;

const ALL_MONTHS = [
	Month.January, Month.February, Month.March, Month.April,
	Month.May, Month.June, Month.July, Month.August,
	Month.September, Month.October, Month.November, Month.December,
];

const MONTH_NAMES: Record<Month, string> = {
	[Month.January]: 'January', [Month.February]: 'February',
	[Month.March]: 'March', [Month.April]: 'April',
	[Month.May]: 'May', [Month.June]: 'June',
	[Month.July]: 'July', [Month.August]: 'August',
	[Month.September]: 'September', [Month.October]: 'October',
	[Month.November]: 'November', [Month.December]: 'December',
};

export function IngredientsSeasonChart() {
	const ingredients = orderBy(
		Object.entries(SEASONS),
		(x) => x[1].includes(CURRENT_SEASON) === false
	);
	return (
		<dl className="
    mx-auto flex flex-col gap-4
    md:gap-0.5
  ">
			{ingredients.map(([ingredient, monthsInSeason]) => {
				const ingredientInSeason = monthsInSeason.includes(CURRENT_SEASON);
				return (
					<div
						key={ingredient}
						className="
        flex flex-col gap-x-8 gap-y-2
        hover:bg-light
        md:flex-row
      "
					>
						<dt className={`
        w-24 font-body text-base/normal text-text
        ${ingredientInSeason ? `font-bold` : ''}
      `}>
							{upperFirst(ingredient)}
						</dt>
						<dd className="flex flex-row gap-0.5">
							{ALL_MONTHS.map((month) => {
								const monthName = MONTH_NAMES[month];
								const inSeason = monthsInSeason.includes(month);
								return (
									<span
										key={month}
										title={inSeason ? monthName : undefined}
										className={`
            w-6 cursor-default text-center
            ${inSeason ? `bg-accent text-background` : `text-light`}
            ${month === CURRENT_SEASON ? `font-bold` : ''}
          `}
									>
										{inSeason && (
											<>
												<span className="sr-only">{monthName}</span>
												<span aria-hidden="true">{monthName[0]}</span>
											</>
										)}
									</span>
								);
							})}
						</dd>
					</div>
				);
			})}
		</dl>
	);
}
