/**
 * @author aelyseev
 * @date 17/12/15
 */

var boardUrl = require('./board.tmpl.html');
var startId = 0;

require('./puzzle');

app.directive('board', [
	'settings', 'puzzleMetrics', '$location',
	function (Settings, metrics, $location) {
		'use strict';

		return {
			restrict: 'A',
			replace: true,

			templateUrl: boardUrl,

			link: function (scope) {
				angular.extend(scope, {
					puzzles: [],

					id: this.puzzles,

					metricsStyle: 'width:' + metrics.size + 'px; height: ' + metrics.size + 'px; margin: ' +
					metrics.space + 'px;' +
					'transform: rotate3d(0, 1, 0, 180deg)',

					gotomenu: function () {
						$location.url('/');
					},

					countClicks: function () {
						scope.clicks++;
					},

					newgame: function () {
						scope.puzzles = generatePuzzles(Settings.getActiveSize(), startId);
						startId += scope.puzzles.length;
						scope.solved = false;
						scope.opened = [];
						scope.clicks = 0;
					}
				});

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
