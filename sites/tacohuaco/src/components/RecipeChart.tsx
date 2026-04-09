import type { ComponentType } from 'react';
import { ChartStepType, type ChartStep } from '../types/Recipe';
import { TextTypo } from './TextTypo';

type Props = { chart: readonly ChartStep[] };
type PictogramProps = { covered: boolean };

const bw = 2;
const bs = 'solid';
const bc = 'var(--color-border)';
const br = '0.2rem';
const brSm = '0.15rem';

function PictogramWarmToRoomTemp() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', paddingTop: '0.2rem', alignItems: 'center', justifyContent: 'center', width: '2.2rem', height: '2rem', fontSize: '1.8rem' }}>
			☀&#xFE0E;
		</div>
	);
}

function PictogramRefrigerate() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', paddingTop: '0.1rem', alignItems: 'center', justifyContent: 'center', width: '2.2rem', height: '2rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: br, fontSize: '1.8rem' }}>
			❄&#xFE0E;
		</div>
	);
}

function PictogramRest({ covered }: PictogramProps) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', gap: '0.1rem', alignItems: 'center', justifyContent: 'flex-end', width: '2.2rem', height: '2rem' }}>
			{covered && <div style={{ marginBottom: '-0.2rem', width: '1.8rem', height: '0.8rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: '2rem 2rem 0 0' }} />}
			<div style={{ width: '1.8rem', height: '0.4rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: `0 0 ${br} ${br}` }} />
			<div style={{ width: '2.2rem', height: '0.1rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: br }} />
		</div>
	);
}

function PictogramSoak() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', gap: '0.1rem', alignItems: 'center', justifyContent: 'flex-end', width: '2.2rem', height: '2rem' }}>
			<div style={{ width: '1.6rem', height: '0.8rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: '0 0 2rem 2rem' }} />
			<div style={{ width: '2.2rem', height: '0.1rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: br }} />
		</div>
	);
}

function PictogramOven() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', gap: '0.2rem', alignItems: 'center', justifyContent: 'center', width: '2.2rem', height: '2rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: br }}>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '0.15rem' }}>
				{[0, 1, 2].map((i) => <div key={i} style={{ width: '0.3rem', height: '0.3rem', borderRadius: '9999px', background: bc }} />)}
			</div>
			<div style={{ width: '1.5rem', height: '0.8rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: brSm }} />
		</div>
	);
}

function PictogramCook({ covered }: PictogramProps) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', paddingTop: covered ? 0 : '0.4rem' }}>
			{covered && (
				<div style={{ display: 'flex', justifyContent: 'center', width: '2.2rem', height: '0.4rem', borderWidth: bw, borderBottomWidth: 0, borderStyle: bs, borderColor: bc, borderRadius: `${br} ${br} 0 0` }}>
					<div style={{ width: '0.4rem', height: '0.3rem', marginTop: '-0.3rem', borderWidth: bw, borderBottomWidth: 0, borderColor: bc, borderStyle: bs, borderRadius: `${br} ${br} 0 0` }} />
				</div>
			)}
			<div style={{ display: 'flex', alignItems: 'center', gap: '2.1rem', justifyContent: 'center', width: '2.2rem', height: '1.6rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: `0 0 ${br} ${br}` }}>
				<div style={{ width: '0.3rem', height: '0.4rem', marginTop: '-0.5rem', marginLeft: '-0.7rem', borderWidth: bw, borderRightWidth: 0, borderColor: bc, borderStyle: bs, borderRadius: `${br} 0 0 ${br}` }} />
				<div style={{ width: '0.3rem', height: '0.4rem', marginTop: '-0.5rem', marginRight: '-0.7rem', borderWidth: bw, borderLeftWidth: 0, borderColor: bc, borderStyle: bs, borderRadius: `0 ${br} ${br} 0` }} />
			</div>
		</div>
	);
}

function PictogramCookInOven({ covered }: PictogramProps) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', gap: '0.2rem', alignItems: 'center', justifyContent: 'center', width: '2.2rem', height: '2rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: br }}>
			<div style={{ display: 'flex', flexDirection: 'column', paddingTop: covered ? '0.3rem' : '0.7rem' }}>
				{covered && (
					<div style={{ display: 'flex', justifyContent: 'center', width: '1.8rem', height: '0.25rem', borderWidth: bw, borderBottomWidth: 0, borderStyle: bs, borderColor: bc, borderRadius: '10rem 10rem 0 0' }}>
						<div style={{ width: '0.5rem', height: '0.25rem', marginTop: '-0.3rem', borderWidth: bw, borderBottomWidth: 0, borderColor: bc, borderStyle: bs, borderRadius: `${br} ${br} 0 0` }} />
					</div>
				)}
				<div style={{ width: '1.8rem', height: '0.7rem', borderWidth: bw, borderStyle: bs, borderColor: bc, borderRadius: '0 0 0.6rem 0.6rem' }} />
			</div>
		</div>
	);
}

const PICTOGRAMS: Record<ChartStepType, ComponentType<PictogramProps>> = {
	[ChartStepType.WarmToRoomTemp]: PictogramWarmToRoomTemp,
	[ChartStepType.Refrigerate]: PictogramRefrigerate,
	[ChartStepType.PreheatOven]: PictogramOven,
	[ChartStepType.Cook]: PictogramCook,
	[ChartStepType.CookInOven]: PictogramCookInOven,
	[ChartStepType.Rest]: PictogramRest,
	[ChartStepType.Soak]: PictogramSoak,
};

function Subtype({ type, subtype }: { type: ChartStepType; subtype: string }) {
	if (type === ChartStepType.WarmToRoomTemp) {
		return <TextTypo variant="small">{subtype.replaceAll(/.* broth/g, 'broth').trim()}</TextTypo>;
	}
	return null;
}

function Value({ value = '', overnight }: { value?: string; overnight: boolean }) {
	const v = value.replaceAll('minutes', 'm').replaceAll(/hours?/g, 'h').replaceAll(/days?/g, 'd').replaceAll(/weeks?/g, 'w').trim();
	return (
		<div className="flex flex-col items-center">
			{v && <TextTypo variant="small" className="-my-0.5 whitespace-nowrap">{v}</TextTypo>}
			{overnight && <TextTypo variant="small" className="-my-0.5">night</TextTypo>}
		</div>
	);
}

function RecipeChartStep({ step }: { step: ChartStep }) {
	const Pictogram = PICTOGRAMS[step.type] ?? 'div';
	return (
		<div className="flex flex-col gap-3 items-center">
			<Pictogram covered={step.covered} />
			{step.subtype && <Subtype type={step.type} subtype={step.subtype} />}
			<Value value={step.value} overnight={step.overnight} />
		</div>
	);
}

export function RecipeChart({ chart }: Props) {
	return (
		<div className="flex flex-row flex-wrap gap-x-8 gap-y-4" aria-hidden>
			{chart.map((step, index) => <RecipeChartStep key={index} step={step} />)}
		</div>
	);
}
