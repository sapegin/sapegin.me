import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { PageWithTitle } from './PageWithTitle';

export interface ColorSpec {
	name: string;
	hex: string;
	rgb: string;
	textColor: string;
}

export interface ColorRow {
	light: ColorSpec;
	dark: ColorSpec;
	darkPurple: ColorSpec;
}

export type PaletteItem = string | [string, 'italic' | 'bold'];
export type Palette = Record<string, PaletteItem>;

export interface CombinedPalette {
	light: Palette;
	dark: Palette;
	darkPurple: Palette;
}

interface Props {
	url: string;
	title: string;
	colorRows: ColorRow[];
	uiColors: CombinedPalette;
	codeColors: CombinedPalette;
	ansiColors: CombinedPalette;
}

export function getColorValue(color: PaletteItem) {
	return Array.isArray(color) ? color[0] : color;
}

function findColorName(
	colorRows: ColorRow[],
	hexColor: string
): string | undefined {
	for (const row of colorRows) {
		if (row.light.hex === hexColor) {
			return row.light.name;
		}
		if (row.dark.hex === hexColor) {
			return row.dark.name;
		}
		if (row.darkPurple.hex === hexColor) {
			return row.darkPurple.name;
		}
	}

	return undefined;
}

const Table = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => (
	<table
		className={clsx('w-full table-fixed border-collapse', className)}
		{...props}
	/>
);

const Th = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
	<th
		className={clsx('w-1/3 py-2 pr-2 text-left font-bold', className)}
		{...props}
	/>
);

const Td = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
	<td className={clsx('py-2 pr-2', className)} {...props} />
);

function ColorCell({
	name,
	hex,
	rgb,
	textColor,
}: {
	name: string;
	hex: string;
	rgb: string;
	textColor: string;
}) {
	return (
		<p
			className="flex flex-col gap-2 rounded-button p-2 font-mono"
			style={{ backgroundColor: hex, color: textColor }}
		>
			<strong className="text-sm">{name}</strong>
			<code className="text-xs">{hex}</code>
			<code className="text-xs">{rgb}</code>
		</p>
	);
}

function MainPalette({ colorRows }: Pick<Props, 'colorRows'>) {
	return (
		<div className="overflow-x-auto">
			<Table>
				<thead>
					<tr>
						<Th>Light</Th>
						<Th>Dark</Th>
						<Th>Dark Deep Purple</Th>
					</tr>
				</thead>
				<tbody>
					{colorRows.map((row) => (
						<tr key={row.light.name}>
							<Td>
								<ColorCell
									name={row.light.name}
									hex={row.light.hex}
									rgb={row.light.rgb}
									textColor={row.light.textColor}
								/>
							</Td>
							<Td>
								<ColorCell
									name={row.dark.name}
									hex={row.dark.hex}
									rgb={row.dark.rgb}
									textColor={row.dark.textColor}
								/>
							</Td>
							<Td>
								<ColorCell
									name={row.darkPurple.name}
									hex={row.darkPurple.hex}
									rgb={row.darkPurple.rgb}
									textColor={row.darkPurple.textColor}
								/>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

function MiniSwatch({ name, hexColor }: { name: string; hexColor: string }) {
	return (
		<div className="flex items-center gap-2">
			<div
				className="size-[1.8rem] rounded-button"
				style={{
					backgroundColor: hexColor,
				}}
			/>
			<div>
				<div className="max-w-32 truncate font-mono text-xs text-text">
					{name}
				</div>
				<div className="font-mono text-xs text-secondary">{hexColor}</div>
			</div>
		</div>
	);
}

function ColorsTable({
	colors,
	colorRows,
}: {
	colors: CombinedPalette;
	colorRows: Props['colorRows'];
}) {
	return (
		<div className="overflow-x-auto">
			<Table>
				<thead>
					<tr>
						<Th>Name</Th>
						<Th>Light</Th>
						<Th>Dark</Th>
						<Th>Dark Deep Purple</Th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(colors.light).map((name) => {
						const lightHex = getColorValue(colors.light[name]);
						const darkHex = getColorValue(colors.dark[name]);
						const darkPurpleHex = getColorValue(colors.darkPurple[name]);
						return (
							<tr key={name}>
								<Td className="w-1/4">
									<p className="typo-small hyphens-auto">{name}</p>
								</Td>
								<Td className="w-1/4">
									<MiniSwatch
										name={findColorName(colorRows, lightHex) ?? ''}
										hexColor={lightHex}
									/>
								</Td>
								<Td className="w-1/4">
									<MiniSwatch
										name={findColorName(colorRows, darkHex) ?? ''}
										hexColor={darkHex}
									/>
								</Td>
								<Td className="w-1/4">
									<MiniSwatch
										name={findColorName(colorRows, darkPurpleHex) ?? ''}
										hexColor={darkPurpleHex}
									/>
								</Td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

function UiSample({ palette }: { palette: Palette }) {
	return (
		<div
			className="flex flex-col gap-4 rounded-button bg-(--text-background) p-2"
			style={
				{
					'--text-background': getColorValue(palette.textBackground),
					'--title-foreground': getColorValue(palette.titleForeground),
					'--text-foreground': getColorValue(palette.textForeground),
					'--secondary-text-foreground': getColorValue(
						palette.secondaryTextForeground
					),
					'--border-color': getColorValue(palette.border),
					'--disabled-foreground': getColorValue(palette.disabledForeground),
					'--link-foreground': getColorValue(palette.linkForeground),
					'--link-hover-foreground': getColorValue(palette.linkHoverForeground),
					'--active-foreground': getColorValue(palette.activeForeground),
					'--active-background': getColorValue(palette.activeBackground),
					'--hover-background': getColorValue(palette.hoverBackground),
					'--match-foreground': getColorValue(palette.matchForeground),
					'--match-background': getColorValue(palette.matchBackground),
					'--secondary-match-background': getColorValue(
						palette.secondaryMatchBackground
					),
					'--selection-background': getColorValue(palette.selectionBackground),
					'--secondary-sel-background': getColorValue(
						palette.secondarySelectionBackground
					),
					'--line-highlight-background': getColorValue(
						palette.lineHighlightBackground
					),
					'--info-foreground': getColorValue(palette.infoForeground),
					'--info-background': getColorValue(palette.infoBackground),
					'--info-border': getColorValue(palette.infoBorder),
					'--success-foreground': getColorValue(palette.successForeground),
					'--success-background': getColorValue(palette.successBackground),
					'--success-border': getColorValue(palette.successBorder),
					'--warning-foreground': getColorValue(palette.warningForeground),
					'--warning-background': getColorValue(palette.warningBackground),
					'--warning-border': getColorValue(palette.warningBorder),
					'--error-foreground': getColorValue(palette.errorForeground),
					'--error-background': getColorValue(palette.errorBackground),
					'--error-border': getColorValue(palette.errorBorder),
					'--active-border': getColorValue(palette.activeBorder),
					'--focus-border': getColorValue(palette.focusBorder),
					'--ui-background': getColorValue(palette.uiBackground),
					'--light-border': getColorValue(palette.lightBorder),
					'--button-foreground': getColorValue(palette.buttonForeground),
					'--button-background': getColorValue(palette.buttonBackground),
					'--button-hover-background': getColorValue(
						palette.buttonHoverBackground
					),
					'--secondary-button-foreground': getColorValue(
						palette.secondaryButtonForeground
					),
					'--secondary-button-background': getColorValue(
						palette.secondaryButtonBackground
					),
					'--secondary-button-hover-background': getColorValue(
						palette.secondaryButtonHoverBackground
					),
					'--disabled-button-background': getColorValue(
						palette.disabledButtonBackground
					),
					'--secondary-ui-background': getColorValue(
						palette.secondaryUiBackground
					),
					'--icon-color': getColorValue(palette.icon),
					'--active-icon': getColorValue(palette.activeIcon),
					'--accent1': getColorValue(palette.accent1),
					'--accent2': getColorValue(palette.accent2),
					'--accent3': getColorValue(palette.accent3),
				} as React.CSSProperties
			}
		>
			<div className="text-(--title-foreground)">titleForeground</div>
			<div className="text-(--text-foreground)">textForeground</div>
			<div className="text-(--secondary-text-foreground)">
				secondaryTextForeground
			</div>
			<div className="h-px bg-(--border-color)" />
			<div className="text-(--disabled-foreground)">disabledForeground</div>
			<div
				className="
      cursor-pointer text-(--link-foreground)
      hover:text-(--link-hover-foreground)
    "
			>
				linkForeground
			</div>
			<div
				className="-mx-2 bg-(--active-background) px-2 text-(--active-foreground)"
			>
				activeForeground/activeBackground
			</div>
			<div className="-mx-2 bg-(--hover-background) px-2 text-(--text-foreground)">
				hoverBackground
			</div>
			<div className="-mx-2 bg-(--match-background) px-2 text-(--match-foreground)">
				matchForeground/matchBackground
			</div>
			<div
				className="
      -mx-2 bg-(--secondary-match-background) px-2 text-(--match-foreground)
    "
			>
				secondaryMatchBackground
			</div>
			<div
				className="-mx-2 bg-(--selection-background) px-2 text-(--text-foreground)"
			>
				selectionBackground
			</div>
			<div
				className="
      -mx-2 bg-(--secondary-sel-background) px-2 text-(--text-foreground)
    "
			>
				secondarySelectionBackground
			</div>
			<div
				className="
      -mx-2 bg-(--line-highlight-background) px-2 text-(--text-foreground)
    "
			>
				lineHighlightBackground
			</div>
			<div
				className="
      border border-solid border-(--info-border) bg-(--info-background) px-2
      text-(--info-foreground)
    "
			>
				infoForeground/infoBackground/infoBorder
			</div>
			<div
				className="
      border border-solid border-(--success-border) bg-(--success-background)
      px-2 text-(--success-foreground)
    "
			>
				successForeground/successBackground/successBorder
			</div>
			<div
				className="
      border border-solid border-(--warning-border) bg-(--warning-background)
      px-2 text-(--warning-foreground)
    "
			>
				warningForeground/warningBackground/warningBorder
			</div>
			<div
				className="
      border border-solid border-(--error-border) bg-(--error-background) px-2
      text-(--error-foreground)
    "
			>
				errorForeground/errorBackground/errorBorder
			</div>
			<div
				className="
      border border-solid border-(--active-border) px-2 text-(--text-foreground)
    "
			>
				activeBorder
			</div>
			<div
				className="
      border border-solid border-(--focus-border) px-2 text-(--text-foreground)
    "
			>
				focusBorder
			</div>
			<div
				className="
      flex flex-col gap-4 overflow-hidden rounded-button border border-solid
      border-(--light-border) bg-(--ui-background) p-2
    "
			>
				<div className="text-(--title-foreground)">titleForeground</div>
				<div className="text-(--text-foreground)">textForeground</div>
				<div className="text-(--secondary-text-foreground)">
					secondaryTextForeground
				</div>
				<div
					className="
       cursor-pointer rounded-button bg-(--button-background) px-2 py-1
       text-(--button-foreground)
       hover:bg-(--button-hover-background)
     "
				>
					button
				</div>
				<div
					className="
       cursor-pointer rounded-button bg-(--secondary-button-background) px-2
       py-1 text-(--secondary-button-foreground)
       hover:bg-(--secondary-button-hover-background)
     "
				>
					secondaryButton
				</div>
				<div
					className="
       rounded-button bg-(--disabled-button-background) px-2 py-1
       text-(--disabled-foreground)
     "
				>
					disabledButton
				</div>
				<div
					className="
       -m-2 flex justify-center gap-2 bg-(--secondary-ui-background) text-lg
     "
				>
					<div className="text-(--icon-color)" title="icon">
						★
					</div>
					<div className="text-(--active-icon)" title="activeIcon">
						★
					</div>
					<div className="text-(--accent1)" title="accent1">
						★
					</div>
					<div className="text-(--accent2)" title="accent2">
						★
					</div>
					<div className="text-(--accent3)" title="accent3">
						★
					</div>
				</div>
			</div>
		</div>
	);
}

function getAnsiDisplayName(fullName: string) {
	const name = fullName.replace('terminal', '').replace('Bright', '');
	return `${name.slice(0, 2)}${fullName.includes('Bright') ? '+' : ''}`;
}

function AnsiSample({ palette }: { palette: Palette }) {
	const entries = Object.entries(palette);
	const width = `${Math.floor(100 / Object.entries(palette).length)}%`;
	return (
		<div className="overflow-x-auto">
			<Table
				style={{ backgroundColor: getColorValue(palette.terminalBackground) }}
			>
				<thead>
					<tr>
						{entries.map(([rowName]) => (
							<Th key={rowName} style={{ width, textAlign: 'center' }}>
								{getAnsiDisplayName(rowName)}
							</Th>
						))}
					</tr>
				</thead>
				<tbody>
					{entries.map(([rowName, rowItem]) => (
						<tr key={rowName}>
							{entries.map(([name, item]) => (
								<Td
									key={name}
									title={`${rowName} on ${name}`}
									style={{
										textAlign: 'center',
										backgroundColor: getColorValue(item),
										color: getColorValue(rowItem),
									}}
								>
									{getAnsiDisplayName(rowName)}
								</Td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

function TableOfContents() {
	return (
		<nav>
			<h2 className="sr-only">Table of contents</h2>
			<ul className="flex gap-4">
				<li>
					<a className="link" href="#palette">
						Palette
					</a>
				</li>
				<li>
					<a className="link" href="#ui-colors">
						UI colors
					</a>
				</li>
				<li>
					<a className="link" href="#code-colors">
						Code colors
					</a>
				</li>
				<li>
					<a className="link" href="#ansi-colors">
						ANSI colors
					</a>
				</li>
			</ul>
		</nav>
	);
}

export function SquirrelsongSpecPage({
	url,
	title,
	colorRows,
	uiColors,
	codeColors,
	ansiColors,
}: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<div className="flex flex-col gap-8">
				<TableOfContents />
				<h2 className="heading-2" id="palette">
					Palette
				</h2>
				<MainPalette colorRows={colorRows} />
				<h2 className="heading-2" id="ui-colors">
					UI colors
				</h2>
				<ColorsTable colors={uiColors} colorRows={colorRows} />
				<div className="grid grid-cols-3 gap-4">
					<UiSample palette={uiColors.light} />
					<UiSample palette={uiColors.dark} />
					<UiSample palette={uiColors.darkPurple} />
				</div>
				<h2 className="heading-2" id="code-colors">
					Code colors
				</h2>
				<ColorsTable colors={codeColors} colorRows={colorRows} />
				<h2 className="heading-2" id="ansi-colors">
					ANSI colors
				</h2>
				<ColorsTable colors={ansiColors} colorRows={colorRows} />
				<div className="flex flex-col gap-2">
					<h3 className="heading-3">ANSI Light</h3>
					<AnsiSample palette={ansiColors.light} />
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="heading-3">ANSI Dark</h3>
					<AnsiSample palette={ansiColors.dark} />
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="heading-3">ANSI Dark Deep Purple</h3>
					<AnsiSample palette={ansiColors.darkPurple} />
				</div>
			</div>
		</PageWithTitle>
	);
}
