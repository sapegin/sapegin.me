'use strict';

var marked = require('marked');
var MarkedRenderer = marked.Renderer;

function Renderer() {
	MarkedRenderer.apply(this, arguments);
}

require('util').inherits(Renderer, MarkedRenderer);

// Replace URL for photos and uploads
Renderer.prototype.image = function(href, title, text) {
	var get_photo_url = hexo.extend.helper.get('get_photo_url');
	title = title || '';
	text = text || '';

	var m = href.match(/^(\w+):\/\/(.*)$/);
	if (m) {
		var protocol = m[1];
		var id = m[2];
		switch (protocol) {
			case 'photo':
				if (hexo.config.photos[id]) {
					href = get_photo_url(hexo.config.photos[id], 'large');
				}
				else {
					console.log('WARNING: photo with ID ' + id + ' not found');
				}
				break;
			case 'upload':
				if (hexo.config.uploads[id]) {
					href = get_photo_url(hexo.config.uploads[id], 'large');
				}
				else {
					console.log('WARNING: upload with URL ' + id + ' not found');
				}
				break;
		}
	}

	if (title) {
		title = ['<figcaption class="entry-photo__text">',
				'<span class="entry-photo__title">', marked(title), '</span>',
			'</figcaption>'
		].join('');
	}

	return [
		'<figure class="entry-photo">',
			'<img src="', href, '" alt="', text, '" class="entry-photo__photo">',
			title,
		'</figure>'
	].join('');
};

// Do not wrap images in <p>
Renderer.prototype.paragraph = function(text) {
	if (/^\s*<figure/.test(text)) {
		return text + '\n';
	}
	else {
		return '<p>' + text + '</p>\n';
	}
};

// Do not put IDs in headers
Renderer.prototype.heading = function(text, level, raw) {
	// @todo We should increase level of heading by one but Koken doesn’t support it.
	var tag = 'h' + level;
	return '<' + tag + '>' + text + '</' + tag + '>\n';
};

function renderer(data) {
	return marked(data.text, {
		renderer: new Renderer()
	});
};

hexo.extend.renderer.register('md', 'html', renderer, true);
