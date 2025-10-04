import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { PageWithTitle } from './PageWithTitle';

export type ColorSpec = {
	name: string;
	hex: string;
	rgb: string;
	textColor: string;
};

export type ColorRow = {
	light?: ColorSpec;
	dark?: ColorSpec;
	darkPurple?: ColorSpec;
};

type Props = {
	url: string;
	title: string;
	colorRows: ColorRow[];
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

export function SquirrelsongSpecPage({ url, title, colorRows }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
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
								<Tr
									key={
										row.light?.name ?? row.dark?.name ?? row.darkPurple?.name
									}
								>
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
			</Stack>
		</PageWithTitle>
	);
}
