/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var boardUrl = require('./board.tmpl.html');
var puzzleIcons = require('../../images/icons');
var puzzleColor = require('../data/colors');

var puzzleClasses = {
	'puzzle-front': false,
	'puzzle-back': false,
	'puzzle-r0': false,
	'puzzle-r90': false,
	'puzzle-r180': false,
	'puzzle-delayed': false
};

var startId = 0;

var generatePuzzles = function (images, colors, boardSize) {
	'use strict';

	var i;
	var puzzles = [];
	var pair;
	var icon;
	var puzzle;
	var classes;

	var state = false;
	var icons = images.slice(0);

	var puzzleIds = Array.apply(null, new Array(boardSize * boardSize)).map(function (v, id) {
		return id;
	});

	var random = function (ceil) {
		return Math.floor(Math.random() * ceil);
	};

	for (i = 0; i < (boardSize * boardSize / 2); i++) {
		icon = icons.splice(random(icons.length), 1)[0];
		pair = [
			puzzleIds.splice(random(puzzleIds.length), 1)[0],
			puzzleIds.splice(random(puzzleIds.length), 1)[0]
		];

		classes = angular.extend({}, puzzleClasses, {
			'puzzle-front': state,
			'puzzle-r0': state,
			'puzzle-back': !state,
			'puzzle-r180': !state
		});

		puzzle = {
			solved: false,
			icon: 'url("' + icon + '")',
			open: state
		};

		puzzles.push(
			angular.extend({id: pair[0], pair: pair[1]}, puzzle, {classes: classes}, {index: startId++}),
			angular.extend({id: pair[1], pair: pair[0]}, puzzle, {classes: angular.copy(classes)}, {index: startId++})
		);
	}
	return puzzles.slice(0).sort(function (a, b) {
		return a.id - b.id;
	});
};

require('./puzzle');

app.directive('board', ['settings', 'puzzleMetrics', '$location', function (Settings, metrics, $location) {
	'use strict';

	return {
		restrict: 'A',
		replace: true,

		templateUrl: boardUrl,

		link: function (scope) {
			scope.metricsStyle = 'width:' + metrics.size + 'px; height: ' +
				metrics.size + 'px; margin: ' + metrics.space + 'px';

			scope.solved = false;

			scope.gotomenu = function () {
				$location.url('/');
			};

			scope.newgame = function () {
				scope.puzzles = generatePuzzles(puzzleIcons, puzzleColor, Settings.getActiveSize());
				scope.opened = [];
			};

			scope.update = function (ids, isForced) {
				[].concat(ids).forEach(function (id) {
					var puzzle = scope.puzzles[id];
					var state = puzzle.open || puzzle.solved;
					var rotated = puzzle.classes['puzzle-r90'];

					puzzle.classes = angular.extend({}, puzzle.classes, {
						'puzzle-front': state,
						'puzzle-back': !state,
						'puzzle-r0': state && !rotated,
						'puzzle-r180': !state && !rotated,
						'puzzle-delayed': isForced
					});
				});

				scope.$apply();
			};

			scope.check = function (id) {
				var pairId = scope.puzzles[id].pair;
				var ids = scope.opened.slice(0);
				if (scope.puzzles[pairId].open) {
					scope.puzzles[pairId].solve = scope.puzzles[id].solve = false;
					scope.opened = [];
					scope.update(ids);
				} else if (scope.opened.length === 2) {
					scope.opened.splice(0, 2).forEach(function (i) {
						scope.animationStep(i, null, true);
					});
					scope.update(ids, true);
				}
			};

			scope.animationStep = function (id, isClick, isForced) {
				var puzzle = scope.puzzles[id];
				var classes = puzzle.classes;

				if (puzzle.solved) {
					return;
				}

				if (isClick || isForced) {
					puzzle.cycleFinished = false;
				}

				if (puzzle.cycleFinished) {
					scope.check(id);
					return;
				}

				if (!classes['puzzle-r90']) {
					classes['puzzle-r90'] = true;
				} else {
					classes['puzzle-r90'] = false;
					puzzle.cycleFinished = true;
					puzzle.open = !puzzle.open;
					if (puzzle.open) {
						scope.opened.push(id);
					}
				}

				scope.update([id], isForced);
			};

			scope.newgame();
		}
	};
}]);
