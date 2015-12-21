/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var puzzleUrl = require('./puzzle.tmpl.html');

app.directive('puzzle', ['$window', function ($window) {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		templateUrl: puzzleUrl,
		link: function (scope, element, attrs) {
			var puzzle = scope.puzzles[attrs.id];

			element.on('transitionend', function (e) {
				if (e.propertyName !== 'transform') {
					return;
				}
				$window.requestAnimationFrame(function () {
					scope.animationStep(attrs.id);
				});
			});

			element.on('click', function () {
				console.log(puzzle);
				if (puzzle.open || puzzle.solved) {
					return;
				}

				$window.requestAnimationFrame(function () {
					scope.animationStep(attrs.id, true);
				});
			});
		}
	};
}]);
