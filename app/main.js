/**
 * @author aelyseev
 * @date 15/12/15
 */

var app = require('./js/app');
var iconStyles = require('./images/icons.css');

// config
require('./js/config');
require('./js/game');

// controllers
require('./js/controllers/menu');

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
		template: require('./tmpl/board.html'),
		link: function (scope, element) {
			console.log(game);
			$timeout(function () {
				element.removeClass('board-initial');
			}, 50);
		}
	};
}]);

app.directive('puzzle', ['colorGenerator', function () {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		template: require('./tmpl/puzzle.html')
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
