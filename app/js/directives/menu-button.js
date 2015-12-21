/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('../app');
var url = require('./menu-button.tmpl.html');

app.directive('menuButton', ['$location', function () {
	'use strict';

	return {
		restricts: 'A',
		replace: true,
		scope: {
			buttonStyle: '@',
			action: '='
		},
		transclude: true,
		templateUrl: url,
		link: function (scope, element) {
			element.on('click', function () {
				scope.$apply(function () {
					scope.action();
				});
			});
		}
	};
}]);
