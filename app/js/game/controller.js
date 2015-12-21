/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');

// directives
require('../directives/menu-button');
require('../directives/board');

app.controller('GameController', ['$scope', 'settings', 'puzzleMetrics', function ($scope, Settings, metrics) {
	'use strict';
	var size = Settings.getActiveSize();

	$scope.boardSize = size * metrics.size + (2 * metrics.space * size);
}]);
