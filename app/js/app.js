/**
 * @author aelyseev
 * @date 15/12/15
 */

var store = require('./store/store.module');

var menuUrl = require('./routes/menu/menu.html');
var gameUrl = require('./routes/game/game.html');

// controllers
var GameController = require('./routes/game/game.controller');
var MenuController = require('./routes/menu/menu.controller');

// directives
var puzzle = require('./directives/puzzle');
var menuButton = require('./directives/menu-button');

var game = angular.module('game', [
	'ngRoute', 'ngStorage', store
]);

// styles
require('../style/index.styl');

game
	.config(['$compileProvider', '$localStorageProvider', function ($compileProvider, $localStorageProvider) {
		'use strict';

		$compileProvider.debugInfoEnabled(DEBUG);
		$localStorageProvider.setKeyPrefix('memory_game_');
	}])
	.config(['$routeProvider', function ($routeProvider) {
		'use strict';

		$routeProvider
			.when('/', {
				templateUrl: menuUrl,
				controller: 'MenuController',
				controllerAs: 'menu'
			})
			.when('/game', {
				templateUrl: gameUrl,
				controller: 'GameController',
				controllerAs: 'game'
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
	.run(['storeState', 'storeActions', '$location', '$rootScope',
		function (state, actions, $location, $rootScope) {
			'use strict';

			// to support build-in back and forward navigation
			$rootScope.$on('$routeChangeSuccess', function (event, current) {
				state.dispatch(actions.routeTo(current.originalPath));
			});

			state.subscribe(function () {
				$rootScope.$evalAsync(function () {
					if ($location.url !== state.getState().route) {
						$location.url(state.getState().route);
					}
				});
			});
		}])
	.controller('MenuController', MenuController)
	.controller('GameController', GameController)
	.directive('menuButton', menuButton)
	.directive('puzzle', puzzle)
;

if (DEBUG) {
	game.run(['$rootScope', '$log', function ($rootScope, $log) {
		'use strict';
		var count = 0;
		$rootScope.$watch(function () {
			$log.log(++count);
		});
	}]);
}

module.exports = game;
