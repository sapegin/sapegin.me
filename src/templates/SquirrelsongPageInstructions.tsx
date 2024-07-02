import type { ReactNode } from 'react';
import { Link } from '../components';

export type Instructions = {
	id: string;
	app: string;
	light?: boolean;
	dark?: boolean;
	comment?: ReactNode;
	urlLight?: string;
	urlDark?: string;
	urlName?: string;
	steps?: ReactNode[];
};

export const instructions: Instructions[] = [
	{
		id: 'vscode',
		app: 'Visual Studio Code',
		light: true,
		dark: true,
		steps: [
			<>
				Open <strong>View → Command Palette</strong> or press{' '}
				<strong>Cmd+Shift+P</strong>
			</>,
			<>
				Choose <strong>Install Extension</strong>
			</>,
			<>
				Type{' '}
				<Link href="https://marketplace.visualstudio.com/items?itemName=sapegin.Theme-SquirrelsongLight">
					Squirrelsong Light
				</Link>{' '}
				or{' '}
				<Link href="https://marketplace.visualstudio.com/items?itemName=sapegin.Theme-SquirrelsongDark">
					Squirrelsong Dark
				</Link>
			</>,
			<>Select it or press Enter to install</>,
		],
	},

	/**
	 * JetBrains
	 */
	{
		id: 'jetbrains',
		app: 'JetBrains',
		light: true,
		comment:
			'Works in all JetBrains IDEs: Android Studio, IDEA, PhpStorm, PyCharm, RubyMine, WebStorm, etc.',

		steps: [
			<>
				Open <strong>Settings</strong>
			</>,
			<>
				Choose <strong>Plugins</strong>, then <strong>Marketplace</strong>
			</>,
			<>
				Type{' '}
				<Link href="https://plugins.jetbrains.com/plugin/22568-squirrelsong-light-theme">
					Squirrelsong Light
				</Link>
			</>,
			<>
				Press <strong>Install</strong>
			</>,
			<>
				Open <strong>Settings</strong>, choose <strong>Squirrelsong</strong> in{' '}
				<strong>Appearance &amp; Behavior → Appearance → Theme</strong> and{' '}
				<strong>Editor → Color Scheme → Scheme</strong>
			</>,
		],
	},

	/**
	 * Sublime Text
	 */
	{
		id: 'sublime',
		app: 'Sublime Text',
		light: true,
		dark: true,
		steps: [
			<>
				<Link href="https://github.com/sapegin/squirrelsong/archive/refs/heads/master.zip">
					Download the repository
				</Link>{' '}
				as a ZIP acrhive
			</>,
			<>Unzip the files</>,
			<>
				Select <strong>Preferences → Browse Packages</strong> to open your
				Sublime Text packages directory
			</>,
			<>
				Copy the <strong>light/Sublime Text/Squirrelsong Light</strong> or{' '}
				<strong>dark/Sublime Text/Squirrelsong Dark</strong> folder into your
				Sublime Text packages directory
			</>,
			<>
				Go to <strong>Preferences → Color Scheme → User</strong> and select the{' '}
				<strong>Squirrelsong Dark</strong> theme
			</>,
		],
	},

	/**
	 * CotEditor
	 */
	{
		id: 'coteditor',
		app: 'CotEditor',
		light: true,
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/CotEditor#readme',
		urlName: 'GitHub',
	},

	/**
	 * Nimble Commander
	 */
	{
		id: 'nimblecommander',
		app: 'Nimble Commander',
		light: true,
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/Nimble%20Commander#readme',
		urlName: 'GitHub',
	},

	/**
	 * iTerm2
	 */
	{
		id: 'iterm',
		app: 'iTerm2',
		dark: true,
		steps: [
			<Link
				key={1}
				href="https://raw.githubusercontent.com/sapegin/squirrelsong/master/dark/iTerm2/Squirrelsong%20Dark.itermcolors"
			>
				Download Squirrelsong Dark.itermcolors
			</Link>,
			<>
				Open <strong>Settings</strong>, then <strong>Profiles</strong>, then{' '}
				<strong>Colors</strong>
			</>,
			<>
				Open <strong>Color presets</strong> dropdown at the bottom, and choose{' '}
				<strong>Import</strong>
			</>,
			<>
				Select <strong>Squirrelsong Dark.itermcolors</strong>
			</>,
			<>
				Select <strong>Squirrelsong Dark</strong> in{' '}
				<strong>Color presets</strong> dropdown
			</>,
		],
	},

	/**
	 * WezTerm
	 */
	{
		id: 'wezterm',
		app: 'WezTerm',
		dark: true,
		urlDark:
			'https://github.com/sapegin/squirrelsong/tree/master/dark/WezTerm#readme',
		urlName: 'GitHub',
	},

	/**
	 * Terminal.app
	 */
	{
		id: 'terminal',
		app: 'Terminal.app',
		dark: true,
		steps: [
			<Link
				key={1}
				href="https://raw.githubusercontent.com/sapegin/squirrelsong/master/dark/Terminal/Squirrelsong%20Dark.terminal"
			>
				Download Squirrelsong Dark.terminal
			</Link>,
			<>
				Open <strong>Settings</strong>, then <strong>Profiles</strong>
			</>,
			<>
				Press the button with three dots at the bottom of the sidebar, and
				choose <strong>Import</strong>
			</>,
			<>
				Select <strong>Squirrelsong Dark.terminal</strong>
			</>,
			<>
				Select <strong>Squirrelsong Dark</strong> in the sidebar
			</>,
			<>
				Select <strong>Default</strong> next to it
			</>,
		],
	},

	/**
	 * Google Chrome DevTools
	 */
	{
		id: 'devtools',
		app: 'Google Chrome DevTools',
		light: true,
		comment:
			'Also works for Microsoft Edge, and other Chromium-based browsers.',
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/Chrome%20DevTools#readme',
		urlName: 'GitHub',
	},

	/**
	 * Google Chrome
	 */
	{
		id: 'chrome',
		app: 'Google Chrome',
		light: true,
		comment:
			'Also works for Microsoft Edge, and other Chromium-based browsers.',
		urlLight:
			'https://chrome.google.com/webstore/detail/squirrelsong-light-theme/djifnfnaealajnoccbifhbgmkholgljn',
		urlName: 'Chrome Web Store',
	},

	/**
	 * Vivaldi
	 */
	{
		id: 'vivaldi',
		app: 'Vivaldi',
		light: true,
		urlLight: 'https://themes.vivaldi.net/themes/zrnvL6V67L4',
		urlName: 'Vivaldi Themes',
	},

	/**
	 * Alfred
	 */
	{
		id: 'alfred',
		app: 'Alfred',
		light: true,
		urlLight: 'https://www.alfredapp.com/extras/theme/5IzAzy3Fuj/',
		urlName: 'Alfredapp.com',
	},

	/**
	 * Slack
	 */
	{
		id: 'slack',
		app: 'Slack',
		light: true,
		dark: true,
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/Slack#readme',
		urlDark:
			'https://github.com/sapegin/squirrelsong/tree/master/dark/Slack#readme',
		urlName: 'GitHub',
	},

	/**
	 * Telegram
	 */
	{
		id: 'telegram',
		app: 'Telegram',
		light: true,
		urlLight: 'https://t.me/addtheme/squirrelsonglight',
		urlName: 'Telegram',
	},

	/**
	 * Bear
	 */
	{
		id: 'Bear',
		app: 'Bear',
		light: true,
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/Bear#readme',
		urlName: 'GitHub',
	},

	/**
	 * Prism
	 */
	{
		id: 'prismjs',
		app: 'Prism',
		light: true,
		dark: true,
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/PrismJs#readme',
		urlDark:
			'https://github.com/sapegin/squirrelsong/tree/master/dark/PrismJs#readme',
		urlName: 'GitHub',
	},

	/**
	 * Midnight Commander
	 */
	{
		id: 'mc',
		app: 'Midnight Commander',
		dark: true,
		urlDark:
			'https://github.com/sapegin/squirrelsong/tree/master/dark/Midnight%20Commander#readme',
		urlName: 'GitHub',
	},

	/**
	 * Marta File Manager
	 */
	{
		id: 'marta',
		app: 'Marta File Manager',
		light: true,
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/Marta#readme',
		urlName: 'GitHub',
	},

	/**
	 * Warp
	 */
	{
		id: 'warp',
		app: 'Warp',
		dark: true,
		urlDark:
			'https://github.com/sapegin/squirrelsong/tree/master/dark/Warp#readme',
		urlName: 'GitHub',
	},

	/**
	 * Vim
	 */
	{
		id: 'vim',
		app: 'Vim',
		light: true,
		comment: 'Also works for Neovim.',
		urlLight:
			'https://github.com/sapegin/squirrelsong/tree/master/light/Vim#readme',
		urlName: 'GitHub',
	},
];
