/**
 * Twitter stats
 * - Number of tweets for last N weeks
 * - Total number of tweets in N weeks
 *
 * Required options: weeksCount, twitterUser, twitterConsumerKey, twitterConsumerSecret, twitterAccessToken, twitterAccessTokenSecret
 * 
 * How to obtain OAuth token:
 * https://dev.twitter.com/apps/new
 * 
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

var WEEK = 1000 * 60 * 60 * 24 * 7;

var Twit = require('twit');

exports.task = function(options, callback) {
	'use strict';

	var now = new Date().getTime(),
		dateRange = WEEK * options.weeksCount,
		oldestDate = now - dateRange,
		tweets = [];

	var T = new Twit({
		consumer_key: options.twitterConsumerKey,
		consumer_secret: options.twitterConsumerSecret,
		access_token: options.twitterAccessToken,
		access_token_secret: options.twitterAccessTokenSecret,
	});

	function get(maxId) {
		var params = {
			trim_user: 1,
			exclude_replies: 1,
			count: 200,
			screen_name: options.twitterUser
		};
		if (maxId) {
			params.max_id = maxId;
		}

		T.get('statuses/user_timeline', params, function(err, events) {
			if (err) {
				console.log(err.message);
				callback(null);
			}
			else {
				var lastEvent = events[events.length-1];
				if (lastEvent) {
					// Remove first tweet (id === maxId) because it exists in two pages
					if (maxId) {
						events.shift();
					}
					if (events.length) {
						tweets = tweets.concat(events);

						var lastEventDate = new Date(lastEvent.created_at).getTime();
						if (lastEventDate > oldestDate) {
							get(lastEvent.id_str);
							return;
						}
					}
				}
				parseTweets(tweets);
			}
		});
	}

	function parseTweets(tweets) {
		var weeks = {};

		tweets.forEach(function(tweet) {
			var date = new Date(tweet.created_at).getTime(),
				weekNum = Math.floor((now - date) / WEEK);

			if (weeks[weekNum])
				weeks[weekNum]++;
			else
				weeks[weekNum] = 1;
		});

		var dataset = { tweets: [], totalTweets: tweets.length };
		for (var weekNum = 0; weekNum <= options.weeksCount; weekNum++) {
			dataset.tweets.push(weeks[weekNum] || 0);
		}
		dataset.tweets = dataset.tweets.reverse();

		callback(dataset);
	}


	get();

};
