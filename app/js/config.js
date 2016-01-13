/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('./app');
var menuUrl = require('./features/menu/view.tmpl.html');
var gameUrl = require('./features/game/view.tmpl.html');

app.config(['$localStorageProvider', function ($localStorageProvider) {
		'use strict';

		$localStorageProvider.setKeyPrefix('game_');
	}])
	.config(['$routeProvider', function ($routeProvider) {
		'use strict';

		$routeProvider
			.when('/', {
				templateUrl: menuUrl,
				controller: 'MenuController'
			})
			.when('/game', {
				templateUrl: gameUrl,
				controller: 'GameController'
			})
			.otherwise({
				redirectTo: '/'
			})
		;
	}]);
