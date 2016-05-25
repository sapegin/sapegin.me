import {
	start,
	loadConfig,
	loadSourceFiles,
	generatePages,
	savePages,
	createMarkdownRenderer,
	createTemplateRenderer,
	helpers as defaultHelpers,
} from 'fledermaus';
import * as customHelpers from './helpers';

start('Building site...');

let config = loadConfig('config');
let options = config.base;

let renderMarkdown = createMarkdownRenderer({
	customTags: {
		embed: ({ id, title }) => {
			return `
				<div class="embed">
					<div class="embed__content embed-${id}">
						<div class="embed-${id}-i" id="${id}"></div>
					</div>
					<div class="embed__description">${title}</div>
				</div>
			`;
		},
	},
});
let renderTemplate = createTemplateRenderer({
	root: options.templatesFolder,
});

const helpers = { ...defaultHelpers, ...customHelpers };

let documents = loadSourceFiles(options.sourceFolder, options.sourceTypes, {
	renderers: {
		md: renderMarkdown,
	},
});

let pages = generatePages(documents, config, helpers, { jsx: renderTemplate });

savePages(pages, options.publicFolder);
