/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var icons = require('../../images/icons');
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

// directives
require('../directives/menu-button');
require('../directives/board');

app.controller('GameController', ['$scope', 'settings', 'puzzleMetrics', function ($scope, Settings, metrics) {
	'use strict';

	var i;
	var n;
	var classname;
	var puzzles = [];

	var size = Number(Settings.size[0]);
	var iconsClasses = Object.keys(icons);
	var puzzleIds = Array.apply(null, new Array(size * size)).map(function (v, id) {
		return id + 1;
	});

	var random = function (ceil) {
		return Math.floor(Math.random() * ceil);
	};

	for (i = 0; i < (size * size / 2); i++) {
		n = random(iconsClasses.length);
		classname = iconsClasses.splice(n, 1)[0];

		puzzles.push(
			{id: puzzleIds.splice(random(puzzleIds.length), 1)[0], icon: 'url("' + icons[classname] + '")'},
			{id: puzzleIds.splice(random(puzzleIds.length), 1)[0], icon: 'url("' + icons[classname] + '")'}
		);
	}

	puzzles.sort(function (a, b) {
		return a.id - b.id;
	});

	$scope.puzzle = metrics;
	$scope.boardSize = size * metrics.size + (2 * metrics.space * size);
	$scope.puzzles = puzzles;
}]);
