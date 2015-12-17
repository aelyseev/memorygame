/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('./app');
app.config(['$localStorageProvider', function ($localStorageProvider) {
		'use strict';

		$localStorageProvider.setKeyPrefix('game_');
	}])
	.config(function ($routeProvider) {
		'use strict';

		$routeProvider
			.when('/', {
				template: require('../tmpl/menu.html'),
				controller: 'MenuController'
			})
			.when('/game', {
				template: require('../tmpl/game.html'),
				game: false,
				controller: 'GameController'
			})
			.otherwise({
				redirectTo: '/game'
			})
		;
	});
