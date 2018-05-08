#!/usr/bin/env node

/**
 * Data gathering for Sapegin.me
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

// @todo log errors

var tasksDir = './tasks';
var outFile = './data.json';
var svgFile = '../public/build/pulse.svg';
var options = {
	weeksCount: 25,
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
	twitterAccessTokenSecret: null,
};
var oldData;

var fs = require('fs');
var log = require('winston');
var path = require('path');
var mkdirp = require('mkdirp');
var taskrunner = require('./lib/taskrunner');
var svgdrawer = require('./lib/draw');

log.add(log.transports.File, { filename: 'gatherer.log' });

var secrets = require('./.secrets.json');
for (var key in secrets) {
	options[key] = secrets[key];
}

if (fs.existsSync(outFile)) {
	oldData = require(outFile);
}

taskrunner.run(tasksDir, options, function(results) {
	for (var id in results) {
		if (results[id] === null && oldData[id]) {
			log.warn('No results for ' + id + '. Old data used.');
			results[id] = oldData[id];
		}
	}

	// Save data as JSON file
	fs.writeFile(outFile, JSON.stringify(results, null, 2), function(err) {
		if (err) {
			log.error('Cannot write file ' + outFile + '.');
		}
	});

	// Save chart to SVG file
	svgdrawer.draw(results, function(svgText) {
		mkdirp.sync(path.dirname(svgFile));
		fs.writeFileSync(svgFile, svgText);
	});
});
