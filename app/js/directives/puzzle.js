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

			scope.$watch('puzzles[$index].clicks', function (newVal, oldVal) {
				if (oldVal === newVal) {
					return;
				}
				$window.requestAnimationFrame(function () {
					element.removeClass('puzzle-animated-paused');
				});
			});

			element.on('animationiteration', function (e) {
				if (e.animationName !== scope.animationName) {
					return;
				}
				$window.requestAnimationFrame(function () {
					element.addClass('puzzle-animated-paused');
					scope.toggle(attrs.id);
				});
			});

			element.on('click', function () {
				if (puzzle.open || puzzle.solved) {
					return;
				}

				scope.countClicks();

				$window.requestAnimationFrame(function () {
					element.removeClass('puzzle-animated-paused');
				});
			});
		}
	};
}]);
