/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var url = require('./menu-button.tmpl.html');

app.directive('menuButton', ['$location', function ($location) {
	'use strict';

	return {
		restricts: 'A',
		replace: true,
		scope: {
			buttonStyle: '@',
			link: '@'
		},
		transclude: true,
		templateUrl: url,
		link: function (scope, element) {
			element.on('click', function () {
				scope.$apply(function () {
					$location.path(scope.link);
				});
			});
		}
	};
}]);
