import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';
import twitterCard from 'wasm-twitter-card';
import { SITE_TITLE } from '../constants';
import { colors } from '../styles/theme.css';

// Based on: https://github.com/alessbell/gatsby-remark-twitter-cards

const WIDTH = 1200;
const HEIGHT = 630;
const TITLE_FONT_SIZE = 96;
const SUBTITLE_FONT_SIZE = 60;
const BACKGROUND_IMAGE = 'assets/twitter-card-background.png';
const FONT_FILE = 'assets/Mondwest-Regular.ttf';
const FONT = fs.readFileSync(FONT_FILE);

export type Props = {
	title: string;
	url: string;
};

function hexToRgb(hex: string) {
	const hexCode = hex.replace(/^#/, '');
	const bigint = parseInt(hexCode, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}

function urlToFilename(url: string) {
	return url.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-');
}

export async function generateSocialImage({
	title,
	url,
}: Props): Promise<string> {
	const buffer = twitterCard.generate_text(
		title,
		SITE_TITLE,
		TITLE_FONT_SIZE,
		SUBTITLE_FONT_SIZE,
		hexToRgb(colors.base),
		'custom', // font style
		FONT
	);

	const backgroundImage = await Jimp.read(BACKGROUND_IMAGE);
	const textImage = new Jimp({
		data: buffer,
		width: WIDTH,
		height: HEIGHT,
	});

	const image = backgroundImage.composite(textImage, 0, 0);

	const filepath = path.join('public/', 'cards', `${urlToFilename(url)}.jpg`);

	await image.writeAsync(filepath);

	return filepath;
}
