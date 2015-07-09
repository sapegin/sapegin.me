// gruntjs.com
// jshint node:true
module.exports = function(grunt) {
	'use strict';

	var dest = 'themes/sapegin/source';

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			dest: dest,
			imagesDest: dest + '/build/images'
		},
		concat: {
			history: {
				nonull: true,
				src: [
					'vendor/gamesoup/jsgamesoup.js',
					'vendor/gamesoup/random.js',
					'vendor/gamesoup/sprite.js',
					'vendor/gamesoup/collisions.js',
					'js/ironman.js'
				],
				dest: dest + '/build/history.js'
			}
		},
		uglify: {
			history: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'<%= concat.history.dest %>': '<%= concat.history.dest %>'
				}
			}
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
