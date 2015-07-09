'use strict';

/**
 * Video tag.
 *
 * Syntax:
 *   {% embed name "Description" %}
 */
hexo.extend.tag.register('embed', function(args) {
	var name = args[0];
	var description = args.slice(1).join(' ');

	return [
		'<div class="embed">',
			'<div class="embed__content embed-', name, '">',
				'<div class="embed-', name, '-i" id="', name, '"></div>',
			'</div>',
			'<div class="embed__description">', description, '</div>',
		'</div>'
	].join('');
});
