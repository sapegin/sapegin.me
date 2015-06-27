// gruntjs.com
// jshint node:true
module.exports = function(grunt) {
	'use strict';

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me',
			dest: 'themes/sapegin/source'
		},
		// All other Grunt plugins
	});

	grunt.registerTask('default', ['styles']);
};
