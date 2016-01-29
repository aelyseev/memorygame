/**
 * @author aelyseev
 * @date 17/12/15
 */

/* global DEBUG */

var menuUrl = require('./routes/menu/menu.html');
var gameUrl = require('./routes/game/game.html');
var routeActions = require('./modules/store/actions/actions-routes');

app.config(['$localStorageProvider', function ($localStorageProvider) {
		'use strict';

		$localStorageProvider.setKeyPrefix('memory_game_');
	}])
	.config(['$compileProvider', function ($compileProvider) {
		'use strict';

		$compileProvider.debugInfoEnabled(DEBUG);
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
			});
	}])
	.run(['$rootScope', '$log', function ($rootScope, $log) {
		'use strict';
		var count = 0;
		if (DEBUG) {
			$rootScope.$watch(function () {
				$log.log(++count);
			});
		}
	}])
	.run(['AppStore', '$location', '$rootScope', function (AppStore, $location, $rootScope) {
		'use strict';

		$rootScope.$on('$routeChangeSuccess', function (event, current) {
			AppStore.dispatch(routeActions.routeTo(current.originalPath));
		});

		AppStore.subscribe(function () {
			$rootScope.$evalAsync(function () {
				if ($location.url !== AppStore.getState().route) {
					$location.url(AppStore.getState().route);
				}
			});
		});
	}])
;

