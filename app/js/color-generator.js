/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('./app');

app.factory('colorGenerator', function () {
	'use strict';

	var colors = [
		'#ffebee',
		'#fce4ec',
		'#f3e5f5',
		'#ede7f6',
		'#e8eaf6',
		'#e3f2fd',
		'#e1f5fe',
		'#e0f7fa',
		'#e0f2f1',
		'#e8f5e9',
		'#f1f8e9',
		'#f9fbe7',
		'#fffde7',
		'#fff8e1',
		'#fff3e0'
	];

	return function (n) {
		var count = colors.length;
		return Array.apply(null, new Array(n)).map(function () {
			return colors[Math.floor(Math.random() * count)];
		});
	};

});
