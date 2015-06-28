// gruntjs.com
// jshint node:true
module.exports = function(grunt) {
	'use strict';

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			dest: 'themes/sapegin/source'
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
			'Roboto-Light': {
				src: 'fonts/Roboto-Light-webfont.*',
				dest: 'themes/sapegin/source/build/Roboto-Light'
			}
		}
	});

	grunt.registerTask('default', ['fontoptim', 'styles', 'scripts']);
};
