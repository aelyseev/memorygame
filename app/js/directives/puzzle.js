/**
 * @author aelyseev
 * @date 17/12/15
 */

var puzzleUrl = require('./puzzle.tmpl.html');

var toggle = function (elem, puzzle) {
	'use strict';

	var start = (puzzle.open) ? 0 : 180;
	var params = {duration: 250};

	return velocity(elem, {
		rotateY: [90, start]
	}, params)
		.then(function (el) {
			angular.element(el).toggleClass(puzzle.classname, !puzzle.open);

			return velocity(el, {
				rotateY: [180 - start, 90]
			}, params);
		});
};

app.directive('puzzle', [function () {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		templateUrl: puzzleUrl,
		link: function (scope, $element, attrs) {
			var puzzle = scope.puzzles[attrs.index];

			scope.$watch('puzzles[$index].clicks', function (newVal, oldVal) {
				if (oldVal === newVal) {
					return;
				}
				toggle($element[0], puzzle).then(function () {
					scope.toggle(attrs.index);
				});
			});

			$element.on('click', function () {
				if (puzzle.open || puzzle.solved) {
					return;
				}

				toggle($element[0], puzzle).then(function () {
					scope.toggle(attrs.index);
					scope.countClicks();
				});
			});
		}
	};
}]);
