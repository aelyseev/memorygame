/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');

// new button
require('../newgame/directive');

app.controller('MenuController', ['$scope', '$location', function ($scope, $location) {
	'use strict';

	angular.extend($scope, {
		newgame: function () {
			$location.path('/game');
		}
	});
}]);
