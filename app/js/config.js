/**
 * @author aelyseev
 * @date 17/12/15
 */

var menuUrl = require('./routes/menu/view.tmpl.html');
var gameUrl = require('./routes/game/view.tmpl.html');

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
