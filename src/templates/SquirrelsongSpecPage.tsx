import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { PageWithTitle } from './PageWithTitle';
import { Heading } from '../components/Heading';
import { Grid } from '../components/Grid';

export type ColorSpec = {
	name: string;
	hex: string;
	rgb: string;
	textColor: string;
};

export type ColorRow = {
	light: ColorSpec;
	dark: ColorSpec;
	darkPurple: ColorSpec;
};

type Palette = Record<string, string>;

export type CombinedPalette = {
	light: Palette;
	dark: Palette;
	darkPurple: Palette;
};

type Props = {
	url: string;
	title: string;
	colorRows: ColorRow[];
	uiColors: CombinedPalette;
};

const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
	<Box as="table" width="100%" borderCollapse="collapse" {...props} />
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
		p="s"
		width="33.3%"
		textAlign="left"
		fontWeight="bold"
		{...props}
	/>
);
const Td = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
	<Box as="td" p="s" {...props} />
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
						<Tr key={row.light?.name ?? row.dark?.name ?? row.darkPurple?.name}>
							<Td>
								{row.light && (
									<ColorCell
										name={row.light.name}
										hex={row.light.hex}
										rgb={row.light.rgb}
										textColor={row.light.textColor}
									/>
								)}
							</Td>
							<Td>
								{row.dark && (
									<ColorCell
										name={row.dark.name}
										hex={row.dark.hex}
										rgb={row.dark.rgb}
										textColor={row.dark.textColor}
									/>
								)}
							</Td>
							<Td>
								{row.darkPurple && (
									<ColorCell
										name={row.darkPurple.name}
										hex={row.darkPurple.hex}
										rgb={row.darkPurple.rgb}
										textColor={row.darkPurple.textColor}
									/>
								)}
							</Td>
						</Tr>
					))}
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
			style={{ backgroundColor: palette['text background'] }}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
			.${id}__link {
				cursor: pointer;
				color: ${palette['link foreground']};
			}
			.${id}__link:hover {
				color: ${palette['link hover foreground']};
			}
			.${id}__button {
				cursor: pointer;
				color: ${palette['button foreground']};
				background-color: ${palette['button background']};
			}
			.${id}__button:hover {
				background-color: ${palette['button hover background']};
			}
			.${id}__secondaryButton {
				cursor: pointer;
				color: ${palette['secondary button foreground']};
				background-color: ${palette['secondary button background']};
			}
			.${id}__secondaryButton:hover {
				background-color: ${palette['secondary button hover background']};
			}
			.${id}__disabledButton {
				color: ${palette['disabled foreground']};
				background-color: ${palette['disabled button background']};
			}
			.${id}__disabledButton:hover {
				background-color: ${palette['disabled button hover background']};
			}
			`,
				}}
			/>
			<Box style={{ color: palette['title foreground'] }}>Title foreground</Box>
			<Box style={{ color: palette['text foreground'] }}>Text foreground</Box>
			<Box style={{ color: palette['secondary text foreground'] }}>
				Secondary text foreground
			</Box>
			<Box height={1} style={{ backgroundColor: palette.border }} />
			<Box style={{ color: palette['disabled foreground'] }}>
				Disabled foreground
			</Box>
			<Box className={`${id}__link`}>Link foreground</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette['match foreground'],
					backgroundColor: palette['match background'],
				}}
			>
				Match foreground/background
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette['text foreground'],
					backgroundColor: palette['selection background'],
				}}
			>
				Selection foreground/background
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette['active foreground'],
					backgroundColor: palette['active background'],
				}}
			>
				Active foreground/background
			</Box>
			<Box
				mx="-s"
				px="s"
				style={{
					color: palette['text foreground'],
					backgroundColor: palette['line highlight background'],
				}}
			>
				Line highlight background
			</Box>
			<Stack
				p="s"
				gap="m"
				borderRadius="base"
				style={{
					backgroundColor: palette['ui background'],
					borderColor: palette['light border'],
					borderWidth: '1px',
					borderStyle: 'solid',
				}}
			>
				<Box style={{ color: palette['title foreground'] }}>
					Title foreground
				</Box>
				<Box style={{ color: palette['text foreground'] }}>Text foreground</Box>
				<Box style={{ color: palette['secondary text foreground'] }}>
					Secondary text foreground
				</Box>
				<Box px="s" py="xs" borderRadius="base" className={`${id}__button`}>
					Button
				</Box>
				<Box
					px="s"
					py="xs"
					borderRadius="base"
					className={`${id}__secondaryButton`}
				>
					Secondary button
				</Box>
				<Box
					px="s"
					py="xs"
					borderRadius="base"
					className={`${id}__disabledButton`}
				>
					Disabled button
				</Box>
			</Stack>
		</Stack>
	);
}

export function SquirrelsongSpecPage({
	url,
	title,
	colorRows,
	uiColors,
}: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				<MainPalette colorRows={colorRows} />
				<Heading level={2}>UI colors</Heading>
				<Grid gap="m" gridTemplateColumns="repeat(3, 1fr)">
					<UiSample id="light" palette={uiColors.light} />
					<UiSample id="dark" palette={uiColors.dark} />
					<UiSample id="darkPurple" palette={uiColors.darkPurple} />
				</Grid>
			</Stack>
		</PageWithTitle>
	);
}
