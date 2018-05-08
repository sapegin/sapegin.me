/**
 * Instagram photos stats:
 * - Number of photos for last N weeks
 * - Total number of photos in N weeks
 *
 * Required options: weeksCount, instagramClientId, instagramClientSecret, instagramToken, instagramUser
 *
 * How to obtain OAuth token:
 * https://api.instagram.com/oauth/authorize/?client_id=b467a3eb98b748e7800e008c109810ba&redirect_uri=http://sapegin.me/&response_type=token
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

/* eslint-disable no-console */

var WEEK = 1000 * 60 * 60 * 24 * 7;

var Instagram = require('instagram-node-lib');

exports.task = function(options, callback) {
	'use strict';

	Instagram.set('client_id', options.instagramCientId);
	Instagram.set('client_secret', options.instagramClientSecret);

	var now = new Date().getTime();
	var dateRange = WEEK * options.weeksCount;
	var oldestDate = Math.round((now - dateRange) / 1000);
	var photos = [];

	function get(maxId) {
		Instagram.users.recent({
			access_token: options.instagramToken,
			user_id: options.instagramUser,
			count: 60,
			max_id: maxId,
			complete: function(items, pagination) {
				photos = photos.concat(items);
				if (pagination && pagination.next_max_id) {
					var lastItem = items[items.length - 1];
					var lastItemDate = parseInt(lastItem.created_time, 10);
					if (lastItemDate > oldestDate) {
						get(pagination.next_max_id);
						return;
					}
				}
				parsePhotos(photos);
			},
			error: function(errorMessage) {
				console.log(errorMessage);
				callback(null);
			},
		});
	}

	function parsePhotos(photos) {
		var weeks = {};

		photos.forEach(function(photo) {
			// Photos per week
			var date = parseInt(photo.created_time, 10) * 1000;
			var weekNum = Math.floor((now - date) / WEEK);

			if (weeks[weekNum]) {
				weeks[weekNum]++;
			} else {
				weeks[weekNum] = 1;
			}
		});

		var photosByWeeks = [];
		var totalPhotos = 0;
		for (var weekNum = 0; weekNum <= options.weeksCount; weekNum++) {
			var photosInWeek = weeks[weekNum] || 0;
			photosByWeeks.push(photosInWeek);
			totalPhotos += photosInWeek;
		}
		photosByWeeks = photosByWeeks.reverse();

		callback({
			photos: photosByWeeks,
			totalPhotos: totalPhotos,
		});
	}

	get();
};
