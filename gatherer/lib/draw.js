#!/usr/bin/env node

// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

var SVG_WIDTH = 800;
var SVG_HEIGHT = 200;

var options = {
	twitter: {
		key: 'tweets',
		totalKey: 'totalTweets',
	},
	github: {
		key: 'commits',
		totalKey: 'totalCommits',
	},
	instagram: {
		key: 'photos',
		totalKey: 'totalPhotos',
	},
};

var d3 = require('d3');
var jsdom = require('jsdom');
var SVGO = require('svgo');

function draw(data, options) {
	var highestPoint = getHighestPoint(data, options);

	var document = jsdom.jsdom();
	var svg = d3
		.select(document.body)
		.append('svg')
		.attr('xmlns', 'http://www.w3.org/2000/svg')
		.attr('viewBox', [0, 0, SVG_WIDTH, SVG_HEIGHT].join(' '))
		.attr('preserveAspectRatio', 'none');

	var totals = {};
	for (var key in data) {
		var currentData = data[key];
		var currentOptions = options[key];
		drawLine(svg, key, currentData[currentOptions.key], highestPoint);
		totals[key] = currentData[currentOptions.totalKey];
	}

	svg.append('desc').text(JSON.stringify(totals));

	return svg.node().outerHTML;
}

function drawLine(svg, key, data, highestPoint) {
	var line = d3.svg
		.line()
		.x(d => d.x)
		.y(d => d.y)
		.interpolate('basis'); // cardinal

	svg
		.append('path')
		.attr('d', line(convertData(data, highestPoint)))
		.attr('id', key);
}

function convertData(data, highestPoint) {
	var length = data.length - 1;
	return data.map(function(y, x) {
		return {
			x: SVG_WIDTH / length * x,
			y: SVG_HEIGHT - SVG_HEIGHT / highestPoint * y,
		};
	});
}

function getHighestPoint(data, options) {
	var highs = [];
	for (var key in data) {
		var currentData = data[key];
		var currentOptions = options[key];
		highs.push(Math.max.apply(Math, currentData[currentOptions.key]));
	}
	return Math.max.apply(Math, highs);
}

/**
 * Draws splines for tweets, commits and instagrams to an SVG string.
 *
 * @param {Object} data
 * @param {Function} callback
 */
exports.draw = function(data, callback) {
	var svgText = draw(data, options);
	var svgo = new SVGO({
		plugins: [
			{
				cleanupIDs: false,
			},
		],
	});
	svgo.optimize(svgText, function(result) {
		callback(result.data);
	});
};
