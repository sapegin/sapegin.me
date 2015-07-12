#!/usr/bin/env node

/**
 * Simple asyncronous tasks runner
 *
 * USAGE:
 * taskrunner.run('/.tasks', options, function(data) {
 *   console.log(data);
 * });
 *
 * Each task shoud be in separate .js file. Example task:
 * exports.task = function(options, callback) {
 *   callback('Test!');
 * };
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

/*jshint node:true, white:false, smarttabs:true */

'use strict';

var fs = require('fs'),
	path = require('path'),
	Q = require('q');


function runTasks(tasksDir, options, callback) {
	var tasks = getTasksList(tasksDir),
		promises = [],
		data = {};

	tasks.forEach(function(filename) {
		var filepath = path.join(tasksDir, filename),
			taskId = path.basename(filename, '.js');
		promises.push(runTask(taskId, filepath, options));
	});

	Q.allSettled(promises)
		.then(function(results) {
			results.forEach(function(result) {
				if (result.state === 'fulfilled') {
					var value = result.value;
					data[value[0]] = value[1];
				}
			});
			callback(data);
		});
}

function getTasksList(tasksDir) {
	return fs.readdirSync(tasksDir)
		.filter(function(filename) {
			return path.extname(filename) === '.js';
		});
}

function runTask(taskId, filepath, options) {
	var task = require(path.join(process.cwd(), filepath)),
		deferred = Q.defer();

	process.nextTick(function() {
		task.task(options, function(data) {
			deferred.resolve([taskId, data]);
		});
	});

	return deferred.promise;
}


exports.run = runTasks;