/**
 * GitHub commits stats:
 * - Contributions number for last N weeks
 * - Total contributions number in N weeks
 *
 * Required options: githubUser
 *
 * @author Artem Sapegin
 * @copyright 2015 Artem Sapegin (sapegin.me)
 * @license MIT
 */

/* eslint-disable no-console */

var WEEK = 1000 * 60 * 60 * 24 * 7;

var request = require('request');
var xml2json = require('simple-xml2json');

exports.task = function(options, callback) {
	'use strict';

	function get() {
		request(
			'https://github.com/users/' + options.githubUser + '/contributions',
			parseResponse
		);
	}

	function parseResponse(err, response, xml) {
		if (err || response.statusCode !== 200) {
			console.log('HTTP request to GitHub failed', err);
			callback(null);
			return;
		}

		var json = xml2json.parser(xml);
		parseContributions(json.svg.g.g);
	}

	function parseContributions(contributions) {
		var contributionsByDay = [];
		contributions.forEach(function(json) {
			if (json.rect.class === 'day') {
				contributionsByDay.push({
					date: json.rect['data-date'],
					count: json.rect['data-count'],
				});
			} else if (Array.isArray(json.rect)) {
				Array.prototype.push.apply(
					contributionsByDay,
					json.rect.map(function(json) {
						return {
							date: json['data-date'],
							count: json['data-count'],
						};
					})
				);
			}
		});

		contributionsByDay = contributionsByDay.reverse();

		var now = new Date().getTime();
		var weeks = {};

		contributionsByDay.forEach(function(day) {
			var date = new Date(day.date).getTime();
			var weekNum = Math.floor((now - date) / WEEK);

			if (!weeks[weekNum]) {
				weeks[weekNum] = 0;
			}
			weeks[weekNum] += day.count;
		});

		var contributionsByWeek = [];
		var totalContributions = 0;
		for (var weekNum = 0; weekNum <= options.weeksCount; weekNum++) {
			var contributionsInWeek = weeks[weekNum] || 0;
			contributionsByWeek.push(contributionsInWeek);
			totalContributions += contributionsInWeek;
		}
		contributionsByWeek = contributionsByWeek.reverse();

		callback({
			commits: contributionsByWeek,
			totalCommits: totalContributions,
		});
	}

	get();
};
