/**
 * @author aelyseev
 * @date 17/12/15
 */

var toggle = function (elem, puzzle) {
	'use strict';

	var start = (puzzle.open) ? 180 : 0;
	var params = {duration: 250};

	return velocity(elem, {
		rotateY: [90, start]
	}, params)
		.then(function (el) {
			angular.element(el)
				.toggleClass(puzzle.classname, puzzle.open)
				.toggleClass('puzzle-close', !puzzle.open);

			return velocity(el, {
				rotateY: [180 - start, 90]
			}, params);
		});
};

var puzzleDirective = function (appState, actions) {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		template: '<div class="puzzle puzzle-close" data-index="{{::puzzle.index}}" style="{{::puzzleStyle}}"></div>',
		link: function (scope, $element) {
			var puzzle = scope.$eval('puzzle');
			var index = scope.$eval('puzzle.index');

			console.log(scope.puzzleStyle);

			if (scope.$eval('puzzle.open')) {
				toggle($element[0], puzzle);
			}

			scope.$watch('puzzle.open', function (newval, oldval) {
				if (newval !== oldval) {
					toggle($element[0], puzzle).then(function () {
						if (newval) {
							appState.dispatch(actions.checkBoard());
						}
					});
				}
			});

			$element.on('click', function () {
				appState.dispatch(actions.clickPuzzle(index));
			});
		}
	};
};

puzzleDirective.$inject = ['storeState', 'storeActions'];

module.exports = puzzleDirective;

