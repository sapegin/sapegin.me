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

const Table = (props: ComponentPropsWithoutRef<'table'>) => (
	<table className="w-full table-fixed border-collapse" {...props} />
);

const Th = (props: ComponentPropsWithoutRef<'th'>) => (
	<th className="w-1/3 py-2 pr-2 text-left font-bold" {...props} />
);

const Td = (props: ComponentPropsWithoutRef<'td'>) => (
	<td className="py-2 pr-2" {...props} />
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
			className="gap-2 rounded-normal p-2 font-mono"
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
				className="size-[1.8rem] rounded-normal"
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

// @todo: Find a better solution
/* eslint-disable better-tailwindcss/no-unknown-classes */

function UiSample({ id, palette }: { id: string; palette: Palette }) {
	return (
		<div
			className="gap-4 rounded-normal p-2"
			style={{ backgroundColor: getColorValue(palette.textBackground) }}
		>
			<style
				// eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
				dangerouslySetInnerHTML={{
					__html: `
			.${id}__link {
				cursor: pointer;
				color: ${getColorValue(palette.linkForeground)};
			}
			.${id}__link:hover {
				color: ${getColorValue(palette.linkHoverForeground)};
			}
			.${id}__button {
				cursor: pointer;
				color: ${getColorValue(palette.buttonForeground)};
				background-color: ${getColorValue(palette.buttonBackground)};
			}
			.${id}__button:hover {
				background-color: ${getColorValue(palette.buttonHoverBackground)};
			}
			.${id}__secondaryButton {
				cursor: pointer;
				color: ${getColorValue(palette.secondaryButtonForeground)};
				background-color: ${getColorValue(palette.secondaryButtonBackground)};
			}
			.${id}__secondaryButton:hover {
				background-color: ${getColorValue(palette.secondaryButtonHoverBackground)};
			}
			.${id}__disabledButton {
				color: ${getColorValue(palette.disabledForeground)};
				background-color: ${getColorValue(palette.disabledButtonBackground)};
			}
			.${id}__disabledButton:hover {
				background-color: ${getColorValue(palette.disabledButtonHoverBackground)};
			}
			`,
				}}
			/>
			<div style={{ color: getColorValue(palette.titleForeground) }}>
				titleForeground
			</div>
			<div style={{ color: getColorValue(palette.textForeground) }}>
				textForeground
			</div>
			<div style={{ color: getColorValue(palette.secondaryTextForeground) }}>
				secondaryTextForeground
			</div>
			<div
				className="h-full"
				style={{ backgroundColor: getColorValue(palette.border) }}
			/>
			<div style={{ color: getColorValue(palette.disabledForeground) }}>
				disabledForeground
			</div>
			<div
				className={`
      ${id}__link
    `}
			>
				linkForeground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.activeForeground),
					backgroundColor: getColorValue(palette.activeBackground),
				}}
			>
				activeForeground/activeBackground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.textForeground),
					backgroundColor: getColorValue(palette.hoverBackground),
				}}
			>
				hoverBackground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.matchForeground),
					backgroundColor: getColorValue(palette.matchBackground),
				}}
			>
				matchForeground/matchBackground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.matchForeground),
					backgroundColor: getColorValue(palette.secondaryMatchBackground),
				}}
			>
				secondaryMatchBackground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.textForeground),
					backgroundColor: getColorValue(palette.selectionBackground),
				}}
			>
				selectionBackground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.textForeground),
					backgroundColor: getColorValue(palette.secondarySelectionBackground),
				}}
			>
				secondarySelectionBackground
			</div>
			<div
				className="-mx-2 px-2"
				style={{
					color: getColorValue(palette.textForeground),
					backgroundColor: getColorValue(palette.lineHighlightBackground),
				}}
			>
				lineHighlightBackground
			</div>
			<div
				className="border border-solid px-2"
				style={{
					color: getColorValue(palette.infoForeground),
					backgroundColor: getColorValue(palette.infoBackground),
					borderColor: getColorValue(palette.infoBorder),
				}}
			>
				infoForeground/infoBackground/infoBorder
			</div>
			<div
				className="border border-solid px-2"
				style={{
					color: getColorValue(palette.successForeground),
					backgroundColor: getColorValue(palette.successBackground),
					borderColor: getColorValue(palette.successBorder),
				}}
			>
				successForeground/successBackground/successBorder
			</div>
			<div
				className="border border-solid px-2"
				style={{
					color: getColorValue(palette.warningForeground),
					backgroundColor: getColorValue(palette.warningBackground),
					borderColor: getColorValue(palette.warningBorder),
				}}
			>
				warningForeground/warningBackground/warningBorder
			</div>
			<div
				className="border border-solid px-2"
				style={{
					color: getColorValue(palette.errorForeground),
					backgroundColor: getColorValue(palette.errorBackground),
					borderColor: getColorValue(palette.errorBorder),
				}}
			>
				errorForeground/errorBackground/errorBorder
			</div>
			<div
				className="border border-solid px-2"
				style={{
					color: getColorValue(palette.textForeground),
					borderColor: getColorValue(palette.activeBorder),
				}}
			>
				activeBorder
			</div>
			<div
				className="border border-solid px-2"
				style={{
					color: getColorValue(palette.textForeground),
					borderColor: getColorValue(palette.focusBorder),
				}}
			>
				focusBorder
			</div>
			<div
				className="gap-4 overflow-hidden rounded-normal border border-solid p-2"
				style={{
					backgroundColor: getColorValue(palette.uiBackground),
					borderColor: getColorValue(palette.lightBorder),
				}}
			>
				<div style={{ color: getColorValue(palette.titleForeground) }}>
					titleForeground
				</div>
				<div style={{ color: getColorValue(palette.textForeground) }}>
					textForeground
				</div>
				<div style={{ color: getColorValue(palette.secondaryTextForeground) }}>
					secondaryTextForeground
				</div>
				<div
					className={clsx(
						`
        ${id}__button
      `,
						'rounded-normal px-2 py-1'
					)}
				>
					button
				</div>
				<div
					className={clsx(
						`
        ${id}__secondaryButton
      `,
						'rounded-normal px-2 py-1'
					)}
				>
					secondaryButton
				</div>
				<div
					className={clsx(
						`
        ${id}__disabledButton
      `,
						'rounded-normal px-2 py-1'
					)}
				>
					disabledButton
				</div>
				<div
					className="-m-2 flex content-center gap-2 text-lg"
					style={{
						backgroundColor: getColorValue(palette.secondaryUiBackground),
					}}
				>
					<div style={{ color: getColorValue(palette.icon) }} title="icon">
						★
					</div>
					<div
						style={{ color: getColorValue(palette.activeIcon) }}
						title="activeIcon"
					>
						★
					</div>
					<div
						style={{ color: getColorValue(palette.accent1) }}
						title="accent1"
					>
						★
					</div>
					<div
						style={{ color: getColorValue(palette.accent2) }}
						title="accent2"
					>
						★
					</div>
					<div
						style={{ color: getColorValue(palette.accent3) }}
						title="accent3"
					>
						★
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable better-tailwindcss/no-unknown-classes */

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
					<UiSample id="light" palette={uiColors.light} />
					<UiSample id="dark" palette={uiColors.dark} />
					<UiSample id="darkPurple" palette={uiColors.darkPurple} />
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
