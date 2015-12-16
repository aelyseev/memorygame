/**
 * @author aelyseev
 * @date 15/12/15
 */

var app = require('./js/app');

require('./style/menu.styl');
require('./style/board.styl');

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

app.directive('board', ['$timeout', function ($timeout) {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		scope: {
			boardSize: '=size',
			puzzles: '=',
			puzzle: '=metrics'
		},
		template: require('./tmpl/board.html'),
		link: function (scope, element) {
			$timeout(function () {
				element.removeClass('board-initial');
			}, 50);
		}
	};
}]);

app.directive('puzzle', [function () {
	'use strict';
	return {
		restrict: 'A',
		replace: true,
		scope: true,
		template: require('./tmpl/puzzle.html'),
		link: function (scope, element, attrs) {
			console.log(element.style);
		}
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

app.config(function ($routeProvider, $locationProvider) {
	'use strict';

	$routeProvider
		.when('/', {
			template: require('./tmpl/menu.html'),
			controller: 'BoardController',
			resolve: {
				delay: function ($q, $timeout) {
					var delay = $q.defer();
					$timeout(delay.reject, 1000);
					return delay.promise;
				}
			}
		})
		.when('/game', {
			template: require('./tmpl/game.html'),
			game: false,
			controller: 'BoardController'
		})
		.otherwise({
			redirectTo: '/'
		})
		;
});


app.run(['$location', '$rootScope', function ($location, $rootScope) {
	'use strict';

	$rootScope.$on('$routeChangeStart', function (event, next) {
		console.log(next.game);
	});
}]);
