/**
 * @author aelyseev
 * @date 15/12/15
 */

var app = require('./js/app');
var iconStyles = require('./images/icons.css');

// config
require('./js/config');

// controllers
require('./js/menu/controller');
require('./js/game/controller');

// directives

require('./style/index.styl');
require('./js/color-generator');

app.constant('puzzleMetrics', {
	size: 55,
	space: 8
});

app.factory('settings', [function () {
	'use strict';

	return {
		difficulty: '2s',
		size: '6×6'
	};
}]);

app.controller('BoardController', ['$scope', 'settings', 'puzzleMetrics', function ($scope, Settings, puzzle) {
	'use strict';
	var size = Number(Settings.size[0]);

	$scope.puzzle = puzzle;
	$scope.boardSize = size * puzzle.size + (2 * puzzle.space * size);
	$scope.puzzles = Array.apply(null, new Array(size * size)).map(function (v, i) {
		return i + 1;
	});
}]);

app.controller('MainController', function ($scope, $route, $routeParams, $location) {
	'use strict';

	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
});

app.run(['$location', '$rootScope', function ($location, $rootScope) {
	'use strict';

	$rootScope.$on('$routeChangeStart', function (event, next) {
		console.log(next.game);
	});
}]);
