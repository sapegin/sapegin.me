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

var WEEK = 1000 * 60 * 60 * 24 * 7;

var Instagram = require('instagram-node-lib');

exports.task = function(options, callback) {
	'use strict';

	Instagram.set('client_id', options.instagramCientId);
	Instagram.set('client_secret', options.instagramClientSecret);

	var now = new Date().getTime(),
		dateRange = WEEK * options.weeksCount,
		oldestDate = Math.round((now - dateRange) / 1000),
		photos = [];

	function get(maxId) {
		Instagram.users.recent({
			access_token: options.instagramToken,
			user_id: options.instagramUser,
			count: 60,
			max_id: maxId,
			complete: function(items, pagination) {
				photos = photos.concat(items);
				if (pagination && pagination.next_max_id) {
					var lastItem = items[items.length-1],
						lastItemDate = parseInt(lastItem.created_time, 10);
					if (lastItemDate > oldestDate) {
						get(pagination.next_max_id);
						return;
					}
				}
				parsePhotos(photos);
			},
			error: function(errorMessage, errorObject, caller) {
				console.log(errorMessage);
				callback(null);
			}
		});
	}

	function parsePhotos(photos) {
		var weeks = {};

		photos.forEach(function(photo) {
			// Photos per week
			var date = parseInt(photo.created_time, 10) * 1000,
				weekNum = Math.floor((now - date) / WEEK);

			if (weeks[weekNum]) {
				weeks[weekNum]++;
			}
			else {
				weeks[weekNum] = 1;
			}
		});

		var dataset = { photos: [], totalPhotos: photos.length };
		for (var weekNum = 0; weekNum <= options.weeksCount; weekNum++) {
			dataset.photos.push(weeks[weekNum] || 0);
		}
		dataset.photos = dataset.photos.reverse();

		callback(dataset);
	}


	get();

};
