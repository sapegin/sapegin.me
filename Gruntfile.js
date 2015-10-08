// gruntjs.com
// jshint node:true
module.exports = function(grunt) {
	'use strict';

	var dest = 'public';

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			modernizr: false,
			pngquant: false,
			dest: dest,
			imagesDest: dest + '/build/images'
		},
		imagemin: {
			options: {
				optimizationLevel: 5,
				progressive: true
			}
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
						'public/**/*'
					]
				},
				options: {
					server: false,
					proxy: 'http://localhost:4242/'
				}
			}
		},
		fontoptim: {
			'Roboto': {
				src: 'fonts/Roboto*.*',
				dest: 'public/build/Roboto'
			}
		}
	});

	grunt.registerTask('default', ['fontoptim', 'styles', 'concat', 'uglify', 'images']);
	grunt.registerTask('deploy', ['default']);
};
