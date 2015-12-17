/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');

// new button
require('../directives/menu-button');

app.controller('MenuController', ['$scope', '$location', function ($scope, $location) {
	'use strict';

	angular.extend($scope, {
		newgame: function () {
			$location.path('/game');
		}
	});
}]);
