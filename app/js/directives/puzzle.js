/**
 * @author aelyseev
 * @date 17/12/15
 */

var puzzleUrl = require('./puzzle.tmpl.html');
var boardActions = require('../modules/store/actions/actions-board');

var toggle = function (elem, puzzle) {
	'use strict';

	var start = (puzzle.open) ? 180 : 0;
	var params = {duration: 250};

	return velocity(elem, {
		rotateY: [90, start]
	}, params)
		.then(function (el) {
			angular.element(el).toggleClass(puzzle.classname, puzzle.open);

			return velocity(el, {
				rotateY: [180 - start, 90]
			}, params);
		});
};

app.directive('puzzle', ['AppStore', function (AppStore) {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		templateUrl: puzzleUrl,
		link: function (scope, $element, attrs) {
			if (scope.puzzles[attrs.index].open) {
				toggle($element[0], scope.puzzles[attrs.index]);
			}

			scope.$watch('puzzle.open', function (newval, oldval) {
				var puzzle = scope.puzzles[attrs.index];
				if (newval !== oldval) {
					toggle($element[0], puzzle).then(function () {
						AppStore.dispatch(boardActions.checkBoard());
					});
				}
			});

			$element.on('click', function () {
				AppStore.dispatch(boardActions.clickPuzzle(attrs.index));
			});
		}
	};
}]);
