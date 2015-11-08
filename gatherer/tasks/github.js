/**
 * GitHub commits stats:
 * - Commit number for last N weeks
 * - Total commits number in N weeks
 * - Number of unique repos in N weeks
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

var WEEK = 1000 * 60 * 60 * 24 * 7;
var MAX_PAGE = 10;

var GitHub = require('github');

exports.task = function(options, callback) {
	'use strict';

	var github = new GitHub({ version: '3.0.0' }),
		now = new Date().getTime(),
		dateRange = WEEK * options.weeksCount,
		oldestDate = now - dateRange,
		pushes = [];


	function get(page) {
		page = page || 1;
		github.events.getFromUser({
			user: options.githubUser,
			page: page
		}, function(err, events) {
			if (err) {
				console.log(err.message);
				callback(null);
			}
			else {
				var lastEvent = events[events.length-1];
				if (lastEvent) {
					pushes = pushes.concat(parseResponse(events));

					var lastEventDate = new Date(lastEvent.created_at).getTime();
					if (lastEventDate > oldestDate && page < MAX_PAGE) {
						get(page + 1);
						return;
					}
				}
				parsePushes(pushes);
			}
		});
	}

	function parseResponse(events) {
		var pushes = [];
		events.forEach(function(event) {
			if (event.type !== 'PushEvent') return;
			if (!event.payload || !event.payload.commits) return;

			pushes.push({
				date: event.created_at,
				repo: event.repo.name,
				commits: event.payload.commits.length
			});
		});
		return pushes;
	}

	function parsePushes(pushes) {
		var weeks = {},
			totalCommits = 0,
			repos = {},
			uiqueRepos = 0;

		pushes.forEach(function(push) {
			var date = new Date(push.date).getTime(),
				weekNum = Math.floor((now - date) / WEEK);

			if (!weeks[weekNum]) {
				weeks[weekNum] = 0;
			}
			weeks[weekNum] += push.commits;
			totalCommits += push.commits;

			if (!repos[push.repo]) {
				repos[push.repo] = true;
				uiqueRepos++;
			}
		});

		var dataset = { commits: [], totalCommits: totalCommits, uiqueRepos: uiqueRepos };
		for (var weekNum = 0; weekNum <= options.weeksCount; weekNum++) {
			var commits = weeks[weekNum] || 0;
			dataset.commits.push(commits);
		}
		dataset.commits = dataset.commits.reverse();

		callback(dataset);
	}


	get();
};
