/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var puzzleUrl = require('./puzzle.tmpl.html');

app.directive('puzzle', ['colorGenerator', function () {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		templateUrl: puzzleUrl
	};
}]);
