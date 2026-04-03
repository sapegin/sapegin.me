// Copies all photos from iCloud Photos folder, converts them to AVIF,
// and creates JSON files with metadata for Astro collections

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ExifReader from 'exifreader';
import sharp from 'sharp';
import type { Photo } from '../src/types/Photo';

const PHOTO_DIR = path.join(
	os.homedir(),
	'Library/Mobile Documents/com~apple~CloudDocs/Pictures/photos'
);
const DEST_DIR = 'src/content/photos';
const PUBLIC_PHOTO_DIR = 'public/photos';
const AVIF_QUALITY = 80;
const AVIF_QUALITY_STEP = 10;
const AVIF_MIN_QUALITY = 40;
const MAX_FILE_SIZE = 500_000;
const THUMBNAIL_WIDTH = 752;

/**
 * Load an image, or crash on error.
 */
function readImage(filepath: string) {
	try {
		return Buffer.from(fs.readFileSync(filepath));
	} catch {
		console.error(`Cannot load photo ${filepath}, exiting…`);
		process.exit(1);
	}
}

/**
 * Load a photo JSON file from an Astro collection folder.
 */
function readMetadata(slug: string): Photo | undefined {
	const filepath = path.join(DEST_DIR, `${slug}.json`);
	if (fs.existsSync(filepath)) {
		const json = JSON.parse(fs.readFileSync(filepath).toString());
		return {
			...json,
			modified: new Date(Date.parse(json.modified)),
			timestamp: json.timestamp
				? new Date(Date.parse(json.timestamp))
				: undefined,
		};
	} else {
		return undefined;
	}
}

/**
 * Convert file name to a slug:
 * IMG_3312 → 3312
 */
function slugify(name: string) {
	return name
		.replace(/\.jpg$/i, '')
		.replaceAll('_', '-')
		.replaceAll(/[^0-9-]/gi, '')
		.replaceAll(/--+/gi, '-')
		.replaceAll(/(^-|-$)/gi, '');
}

/**
 * Join non-empty array items with a comma:
 * ['Foo', null, 'Bar'] → 'Foo, Bar'
 */
function asList(array: (string | undefined | null)[]) {
	return array.filter(Boolean).join(', ');
}

/**
 * Parse EXIF date strings and convert them to integer timestamps:
 * 2025:02:13 18:25:59 → 1739467559000
 */
function parseExifDate(dateString?: string) {
	if (dateString === undefined) {
		return undefined;
	}

	// EXIF dates are stored as strings like `2025:02:13 18:25:59`. To be able
	// to parse them, we need to convert `:`s in the date section to `-`s
	const dateStringCorrected = dateString.replace(
		/^(\d{4}):(\d{2}):(\d{2})/,
		'$1-$2-$3'
	);

	const parsedDate = Date.parse(dateStringCorrected);
	return parsedDate ? new Date(parsedDate) : undefined;
}

/**
 * Format date as a human-readable string:
 * 1601459608000 → 'September 2020'
 */
function formatDate(timestamp: Date) {
	return new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
	}).format(timestamp);
}

/**
 * Return dominant color of an image.
 */
async function getDominantColor(buffer: Buffer) {
	const { dominant } = await sharp(buffer).stats();
	const hex = [dominant.r, dominant.g, dominant.b]
		.map((c) => c.toString(16).padStart(2, '0'))
		.join('');
	return `#${hex}`;
}

/**
 * Convert an image to AVIF and save it to the public folder.
 */
async function writeAvif(
	pipeline: sharp.Sharp,
	outputPath: string,
	quality: number
) {
	await pipeline.avif({ quality }).toFile(outputPath);
	const { size } = fs.statSync(outputPath);
	if (size > MAX_FILE_SIZE && quality - AVIF_QUALITY_STEP >= AVIF_MIN_QUALITY) {
		await writeAvif(pipeline, outputPath, quality - AVIF_QUALITY_STEP);
	}
}

async function convertToAvif(buffer: Buffer, slug: string) {
	await writeAvif(
		sharp(buffer),
		path.join(PUBLIC_PHOTO_DIR, `${slug}.avif`),
		AVIF_QUALITY
	);
	await writeAvif(
		sharp(buffer).resize({ width: THUMBNAIL_WIDTH }),
		path.join(PUBLIC_PHOTO_DIR, `${slug}_thumb.avif`),
		AVIF_QUALITY
	);
}

/**
 * Create a Photo object to store in Astro collections.
 */
function enhanceMetadata({
	name,
	slug,
	width,
	height,
	mtimeMs,
	color,
	exif,
}: {
	name: string;
	slug: string;
	width: number;
	height: number;
	mtimeMs: number;
	color: string;
	exif: ExifReader.Tags;
}): Photo {
	const date = parseExifDate(exif.DateTimeOriginal?.description);
	return {
		name,
		slug,
		color,
		width,
		height,
		modified: new Date(mtimeMs),
		timestamp: date,
		formattedDate: date ? formatDate(date) : undefined,
		title: exif['Object Name']?.description ?? '',
		caption: exif['Caption/Abstract']?.description ?? '',
		location: asList([
			exif.Sublocation?.description,
			exif.City?.description,
			exif.Country?.description,
		]),
		keywords: Array.isArray(exif.Keywords)
			? exif.Keywords.map((x) => x.description)
			: [],
		rating: exif.Rating?.value ? Number(exif.Rating?.value) : 0,
	};
}

console.log();
console.log('[PHOTOS] Gathering photos…');

fs.mkdirSync(DEST_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_PHOTO_DIR, { recursive: true });

const photoFiles = fs.globSync(`${PHOTO_DIR}/*.jpg`);

console.log();
console.log(`[PHOTOS] ${photoFiles.length} photos found`);

console.log();
console.log('[PHOTOS] Updating photos…');

let count = 0;

for (const filepath of photoFiles) {
	const { name } = path.parse(filepath);
	const slug = slugify(name);

	const metadata = readMetadata(slug);
	const { mtimeMs } = fs.statSync(filepath);

	if (metadata && metadata.modified.getTime() >= mtimeMs) {
		continue;
	}

	console.log(`👉 ${name}…`);

	const buffer = readImage(filepath);

	const sharpMeta = await sharp(buffer).metadata();
	const width = sharpMeta.width ?? 0;
	const height = sharpMeta.height ?? 0;

	const exif = ExifReader.load(buffer);

	const color = await getDominantColor(buffer);

	const photo = enhanceMetadata({
		name,
		slug,
		mtimeMs,
		width,
		height,
		exif,
		color,
	});

	await convertToAvif(buffer, slug);

	fs.writeFileSync(
		path.join(DEST_DIR, `${slug}.json`),
		JSON.stringify(photo, null, 2)
	);

	count++;
}

console.log();
console.log(`[PHOTOS] ${count} photos updated`);
