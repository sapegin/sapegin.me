// gruntjs.com
// jshint node:true
module.exports = function(grunt) {
	'use strict';

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			dest: 'themes/sapegin/source',
			imagesDest: 'themes/sapegin/source/build/images'
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'themes/sapegin/**/*'
					]
				},
				options: {
					server: false,
					proxy: 'http://localhost:4000/'
				}
			}
		},
		fontoptim: {
			'Roboto': {
				src: 'fonts/Roboto*.*',
				dest: 'themes/sapegin/source/build/Roboto'
			}
		}
	});

	grunt.registerTask('default', ['fontoptim', 'styles', 'scripts']);
};
