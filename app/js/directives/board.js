/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var boardUrl = require('./board.tmpl.html');

require('./puzzle');

app.directive('board', [function () {
	'use strict';

	return {
		restrict: 'A',
		replace: true,
		scope: {
			size: '=',
			puzzles: '=',
			metrics: '='
		},
		templateUrl: boardUrl
	};
}]);
