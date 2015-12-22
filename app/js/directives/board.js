/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var boardUrl = require('./board.tmpl.html');
var puzzleStyles = require('../../images/icons.styl');
var iconNames = require('../../images/icons.js');
var startId = 0;
var p = require('./puzzle');

var generatePuzzles = function (images, boardSize) {
	'use strict';

	var i;
	var puzzles = [];
	var pair;
	var iconName;
	var puzzle;

	var state = false;
	var icons = images.slice(0);

	var puzzleIds = Array.apply(null, new Array(boardSize * boardSize)).map(function (v, id) {
		return id;
	});

	var random = function (ceil) {
		return Math.floor(Math.random() * ceil);
	};

	for (i = 0; i < (boardSize * boardSize / 2); i++) {
		iconName = icons.splice(random(icons.length), 1)[0];
		pair = [
			puzzleIds.splice(random(puzzleIds.length), 1)[0],
			puzzleIds.splice(random(puzzleIds.length), 1)[0]
		];

		puzzle = {
			solved: false,
			clicks: 0,
			classes: puzzleStyles[iconName],
			open: state
		};

		puzzles.push(
			angular.extend({index: pair[0], pair: pair[1]}, puzzle, {id: startId++}),
			angular.extend({index: pair[1], pair: pair[0]}, puzzle, {id: startId++})
		);
	}
	return puzzles.slice(0).sort(function (a, b) {
		return a.index - b.index;
	});
};

app.directive('board', ['settings', 'puzzleMetrics', '$location', function (Settings, metrics, $location) {
	'use strict';

	return {
		restrict: 'A',
		replace: true,

		templateUrl: boardUrl,

		link: function (scope) {
			scope.metricsStyle = 'width:' + metrics.size + 'px; height: ' +
				metrics.size + 'px; margin: ' + metrics.space + 'px';

			scope.animationName = puzzleStyles.rotate;

			scope.gotomenu = function () {
				$location.url('/');
			};

			scope.countClicks = function () {
				scope.clicks++;
			};

			scope.newgame = function () {
				scope.puzzles = generatePuzzles(iconNames, Settings.getActiveSize());
				scope.solved = false;
				scope.opened = [];
				scope.clicks = 0;
			};

			scope.toggle = function (index) {
				scope.$apply(function () {
					var state = !scope.puzzles[index].open;
					scope.puzzles[index].open = state;
					if (state) {
						scope.opened.push(index);
					}
					scope._updateBoard();
				});
			};

			scope._updateBoard = function () {
				var puzzles = scope.puzzles;
				var pair;

				if (scope.opened.length < 2) {
					return;
				}

				pair = scope.opened.splice(0, 2);

				if (puzzles[pair[0]].pair === puzzles[pair[1]].index) {
					scope.puzzles[pair[0]].solved = scope.puzzles[pair[1]].solved = true;
				} else {
					pair.forEach(function (index) {
						scope.puzzles[index].clicks++;
					});
				}
				scope.solved = scope.puzzles.every(function (puzzle) {
					return puzzle.solved;
				});
			};

			scope.newgame();
		}
	};
}]);
