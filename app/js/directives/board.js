/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
require('../puzzle/puzzle');

var boardUrl = require('./board.html');

app.directive('board', ['$timeout', 'game', function ($timeout, game) {
	'use strict';

	return {
		restrict: 'A',
		replace: true,
		scope: {
			size: '=',
			puzzles: '=',
			metrics: '='
		},
		templateUrl: boardUrl,
		link: function (scope, element) {
			console.log(game);
			$timeout(function () {
				element.removeClass('board-initial');
			}, 50);
		}
	};
}]);
