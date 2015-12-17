/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');

// directives
require('../directives/menu-button');
require('../directives/board');

app.controller('GameController', ['$scope', 'settings', 'puzzleMetrics', function ($scope, Settings, puzzle) {
	'use strict';

	var size = Number(Settings.size[0]);

	$scope.puzzle = puzzle;
	$scope.boardSize = size * puzzle.size + (2 * puzzle.space * size);
	$scope.puzzles = Array.apply(null, new Array(size * size)).map(function (v, i) {
		return i + 1;
	});
}]);
