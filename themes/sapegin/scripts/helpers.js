'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var marked = require('marked');
var richtypo = require('richtypo');

richtypo.lang(hexo.config.language);

var helpers = {};

helpers.page_title = function(suffix) {
	if (this.page.page_title) {
		return this.page.page_title;
	}
	if (suffix === undefined) {
		suffix = true;
	}
	if (this.is_home()) {
		return this.config.title + (suffix ? (' — ' + this.config.title_description) : '');
	}
	if (this.page.title) {
		if (suffix) {
			suffix = ' — ' + this.config.title;
		}
		return this.page.title + suffix || '';
	}
	else {
		return this.config.title;
	}
};

helpers.fingerprint = _.memoize(function(filepath) {
	var datetime = fs.statSync(this.theme_filepath(filepath)).mtime.getTime();
	return filepath + '?' + datetime;
});

helpers.embed_file = _.memoize(function(filepath) {
	return fs.readFileSync(this.theme_filepath(filepath), {encoding: 'utf8'});
});

helpers.theme_filepath = function(filepath) {
	return path.join(this.config.theme_path, filepath);
};

helpers.body_class = function() {
	var types = this.page.page_type;
	if (types) {
		if (!Array.isArray(types)) {
			types = [types];
		}
		types = types.map(function(type) {
			return 'page_' + type;
		});
		return 'page ' + types.join(' ');
	}
	else {
		return 'page';
	}
};

helpers.set_page_type = function() {
	var types = _.toArray(this.page.page_type).concat(_.toArray(arguments));
	this.page.page_type = _.uniq(types);
};

helpers.important_posts = function(limit) {
	var important = this.site.posts.filter(function(post) {
		return post.important;
	});
	return important.limit(limit);
};

helpers.ordered_tags = function() {
	return this.site.tags.sort('length', -1);
};

// List of clases for review tags
helpers.tags_classes = function(list, prefix) {
	list = list.map(function(tag) {
		return prefix + '_' + tag;
	});
	return list.join(' ');
};

// Adds partner ID to link
helpers.buy_link = function(url) {
	for (var partner in this.theme.partners) {
		if (url.indexOf(partner) !== -1) {
			return url + this.theme.partners[partner];
		}
	}
	return url;
};

helpers.absolutize_links = function(s) {
	return s && s.replace(/href="#/g, 'href="http://birdwatcher.ru/reading/#');
};

// Richtypo.js: body text
helpers.rt = function(s) {
	return s && richtypo.rich(s);
};

// Richtypo.js: title
helpers.rtt = function(s) {
	return s && richtypo.title(s);
};

// Markdown
helpers.md = function(s) {
	if (s) {
		var html = marked(s);
		html = html.replace(/«<a([^>]+>)([^<]*)(<\/a>)»/g, '<a class="link_quoted"$1«<u>$2</u>»$3');  // Tweak quoted links
		return html;
	}
};

// Markdown string
helpers.mds = function(s) {
	if (s) {
		var html = marked(s);
		html = html
			.replace(/^\s*<p>/, '')
			.replace(/<\/p>\s*$/, '')
		;
		return html;
	}
};

// Register all helpers
Object.keys(helpers).forEach(function(name) {
	hexo.extend.helper.register(name, helpers[name]);
});
