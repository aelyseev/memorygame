/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');

// new button
require('../directives/menu-button');

app.controller('MenuController', ['$scope', '$location', 'settings', function ($scope, $location, Settings) {
	'use strict';
	$scope.sizes = Settings.getState();

	$scope.setSize = function (name) {
		$scope.sizes = Settings.setState(name);
	};

	$scope.newgame = function () {
		$location.path('/game');
	};
}]);
