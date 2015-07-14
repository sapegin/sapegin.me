#!/usr/bin/env node

/**
 * Data gathering for Sapegin.me
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

/*jshint node:true, white:false, smarttabs:true */

// @todo log errors

'use strict';

var tasksDir = './tasks',
	outFile = './data.json',
	svgFileDev = '../themes/sapegin/source/build/pulse.svg',
	svgFileProd = '../public/build/pulse.svg',
	options = {
		weeksCount: 12,
		githubUser: 'sapegin',
		instagramUser: 16919229,
		twitterUser: 'sapegin',

		// Following options shoud be in ./.secrets.json
		instagramClientId: null,
		instagramClientSecret: null,
		instagramToken: null,
		twitterConsumerKey: null,
		twitterConsumerSecret: null,
		twitterAccessToken: null,
		twitterAccessTokenSecret: null
	},
	oldData;


var fs = require('fs'),
	log = require('winston'),
	mkdirp = require('mkdirp'),
	taskrunner = require('./libs/taskrunner'),
	svgdrawer = require('./libs/draw');

log.add(log.transports.File, { filename: 'gatherer.log' });

var secrets = require('./.secrets.json');
for (var key in secrets) if (secrets.hasOwnProperty(key)) {
	options[key] = secrets[key];
}

if (fs.existsSync(outFile)) {
	oldData = require(outFile);
}


taskrunner.run(tasksDir, options, function(results) {
	for (var id in results) if (results.hasOwnProperty(id)) {
		if (results[id] === null && oldData[id]) {
			log.warn('No results for ' + id + '. Old data used.');
			results[id] = oldData[id];
		}
	}

	// Save data as JSON file
	mkdirp.sync(path.dirname(outFile));
	fs.writeFile(outFile, JSON.stringify(results), function(err) {
		if (err) {
			log.error('Cannot write file ' + outFile + '.');
		}
	});

	// Save chart to SVG file
	svgdrawer.draw(results, function(svgText) {
		mkdirp.sync(path.dirname(svgFileDev));
		fs.writeFileSync(svgFileDev, svgText);
		mkdirp.sync(path.dirname(svgFileProd));
		fs.writeFileSync(svgFileProd, svgText);
	});
});
