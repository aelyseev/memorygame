/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var url = require('./new-game.tmpl.html');

app.directive('newGame', [function () {
	'use strict';

	return {
		restricts: 'A',
		replace: true,
		scope: {
			type: '@'
		},
		templateUrl: url
	};
}]);
