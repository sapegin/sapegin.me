import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { PageWithTitle } from './PageWithTitle';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Grid } from '../components/Grid';
import { css } from '../../styled-system/css';
import { VisuallyHidden } from '../components/VisuallyHidden';
import { Link } from '../components/Link';

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

const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
	<Box
		as="table"
		width="100%"
		borderCollapse="collapse"
		css={{ tableLayout: 'fixed' }}
		{...props}
	/>
);
const Thead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<Box as="thead" {...props} />
);
const Tbody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<Box as="tbody" {...props} />
);
const Tr = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
	<Box as="tr" {...props} />
);
const Th = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
	<Box
		as="th"
		py="s"
		pr="s"
		width="33.3%"
		textAlign="left"
		fontWeight="bold"
		{...props}
	/>
);
const Td = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
	<Box as="td" py="s" pr="s" {...props} />
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
		<Stack
			as="p"
			gap="s"
			p="s"
			borderRadius="base"
			fontFamily="code"
			style={{ backgroundColor: hex, color: textColor }}
		>
			<Box as="strong" fontSize="s">
				{name}
			</Box>
			<Box as="code" fontSize="xs">
				{hex.toUpperCase()}
			</Box>
			<Box as="code" fontSize="xs">
				{rgb}
			</Box>
		</Stack>
	);
}

function MainPalette({ colorRows }: Pick<Props, 'colorRows'>) {
	return (
		<Box css={{ overflowX: 'auto' }}>
			<Table>
				<Thead>
					<Tr>
						<Th>Light</Th>
						<Th>Dark</Th>
						<Th>Dark Deep Purple</Th>
					</Tr>
				</Thead>
				<Tbody>
					{colorRows.map((row) => (
						<Tr key={row.light.name}>
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
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}

function MiniSwatch({ name, hexColor }: { name: string; hexColor: string }) {
	return (
		<Stack direction="row" gap="s" alignItems="center">
			<Box
				width="1.8rem"
				height="1.8rem"
				borderRadius="base"
				style={{
					backgroundColor: hexColor,
				}}
			/>
			<Stack>
				<Box
					fontFamily="code"
					fontSize="xs"
					css={{
						color: 'text',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						maxWidth: '8rem',
					}}
				>
					{name}
				</Box>
				<Box fontFamily="code" fontSize="xs" css={{ color: 'secondary' }}>
					{hexColor}
				</Box>
			</Stack>
		</Stack>
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
		<Box css={{ overflowX: 'auto' }}>
			<Table>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Light</Th>
						<Th>Dark</Th>
						<Th>Dark Deep Purple</Th>
					</Tr>
				</Thead>
				<Tbody>
					{Object.keys(colors.light).map((name) => {
						const lightHex = getColorValue(colors.light[name]);
						const darkHex = getColorValue(colors.dark[name]);
						const darkPurpleHex = getColorValue(colors.darkPurple[name]);
						return (
							<Tr key={name}>
								<Td className={css({ width: '25%' })}>
									<Text variant="small" hyphens="auto">
										{name}
									</Text>
								</Td>
								<Td className={css({ width: '25%' })}>
									<MiniSwatch
										name={findColorName(colorRows, lightHex) ?? ''}
										hexColor={lightHex}
									/>
								</Td>
								<Td className={css({ width: '25%' })}>
									<MiniSwatch
										name={findColorName(colorRows, darkHex) ?? ''}
										hexColor={darkHex}
									/>
								</Td>
								<Td className={css({ width: '25%' })}>
									<MiniSwatch
										name={findColorName(colorRows, darkPurpleHex) ?? ''}
										hexColor={darkPurpleHex}
									/>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Box>
	);
}

function UiSample({ id, palette }: { id: string; palette: Palette }) {
	return (
		<Stack
			p="s"
			gap="m"
			borderRadius="base"
			style={{ backgroundColor: palette.textBackground }}
		>
			<style
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
			<Box style={{ color: palette.titleForeground }}>titleForeground</Box>
			<Box style={{ color: palette.textForeground }}>textForeground</Box>
			<Box style={{ color: palette.secondaryTextForeground }}>
				secondaryTextForeground
			</Box>
			<Box height={1} style={{ backgroundColor: palette.border }} />
			<Box style={{ color: palette.disabledForeground }}>
				disabledForeground
			</Box>
			<Box className={`${id}__link`}>linkForeground</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.activeForeground,
					backgroundColor: palette.activeBackground,
				}}
			>
				activeForeground/activeBackground
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.textForeground,
					backgroundColor: palette.hoverBackground,
				}}
			>
				hoverBackground
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.matchForeground,
					backgroundColor: palette.matchBackground,
				}}
			>
				matchForeground/matchBackground
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.matchForeground,
					backgroundColor: palette.secondaryMatchBackground,
				}}
			>
				secondaryMatchBackground
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.textForeground,
					backgroundColor: palette.selectionBackground,
				}}
			>
				selectionForeground/selectionBackground
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.textForeground,
					backgroundColor: palette.secondarySelectionBackground,
				}}
			>
				secondarySelectionBackground
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette.textForeground,
					backgroundColor: palette.lineHighlightBackground,
				}}
			>
				lineHighlightBackground
			</Box>
			<Box
				px="s"
				style={{
					color: palette.textForeground,
					borderColor: palette.activeBorder,
					borderWidth: '1px',
					borderStyle: 'solid',
				}}
			>
				activeBorder
			</Box>
			<Box
				px="s"
				style={{
					color: palette.textForeground,
					borderColor: palette.focusBorder,
					borderWidth: '1px',
					borderStyle: 'solid',
				}}
			>
				focusBorder
			</Box>
			<Stack
				p="s"
				gap="m"
				borderRadius="base"
				overflow="hidden"
				style={{
					backgroundColor: palette.uiBackground,
					borderColor: palette.lightBorder,
					borderWidth: '1px',
					borderStyle: 'solid',
				}}
			>
				<Box style={{ color: palette.titleForeground }}>titleForeground</Box>
				<Box style={{ color: palette.textForeground }}>textForeground</Box>
				<Box style={{ color: palette.secondaryTextForeground }}>
					secondaryTextForeground
				</Box>
				<Box px="s" py="xs" borderRadius="base" className={`${id}__button`}>
					button
				</Box>
				<Box
					px="s"
					py="xs"
					borderRadius="base"
					className={`${id}__secondaryButton`}
				>
					secondaryButton
				</Box>
				<Box
					px="s"
					py="xs"
					borderRadius="base"
					className={`${id}__disabledButton`}
				>
					disabledButton
				</Box>
				<Stack
					direction="row"
					gap="s"
					m="-s"
					fontSize="l"
					justifyContent="center"
					style={{ backgroundColor: palette.secondaryUiBackground }}
				>
					<Box style={{ color: palette.icon }} title="icon">
						★
					</Box>
					<Box style={{ color: palette.activeIcon }} title="activeIcon">
						★
					</Box>
					<Box style={{ color: palette.shyAccent }} title="shyAccent">
						★
					</Box>
					<Box style={{ color: palette.boldAccent }} title="boldAccent">
						★
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
}

function TableOfContents() {
	return (
		<Box as="nav">
			<VisuallyHidden as="h2">Table of contents</VisuallyHidden>
			<Stack as="ul" direction="row" gap="m">
				<Box as="li">
					<Link href="#palette">Palette</Link>
				</Box>
				<Box as="li">
					<Link href="#ui-colors">UI colors</Link>
				</Box>
				<Box as="li">
					<Link href="#code-colors">Code colors</Link>
				</Box>
				<Box as="li">
					<Link href="#ansi-colors">ANSI colors</Link>
				</Box>
			</Stack>
		</Box>
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
			<Stack gap="l">
				<TableOfContents />
				<Heading level={2} id="palette">
					Palette
				</Heading>
				<MainPalette colorRows={colorRows} />
				<Heading level={2} id="ui-colors">
					UI colors
				</Heading>
				<ColorsTable colors={uiColors} colorRows={colorRows} />
				<Grid gap="m" gridTemplateColumns="repeat(3, 1fr)">
					<UiSample id="light" palette={uiColors.light} />
					<UiSample id="dark" palette={uiColors.dark} />
					<UiSample id="darkPurple" palette={uiColors.darkPurple} />
				</Grid>
				<Heading level={2} id="code-colors">
					Code colors
				</Heading>
				<ColorsTable colors={codeColors} colorRows={colorRows} />
				<Heading level={2} id="ansi-colors">
					ANSI colors
				</Heading>
				<ColorsTable colors={ansiColors} colorRows={colorRows} />
			</Stack>
		</PageWithTitle>
	);
}
