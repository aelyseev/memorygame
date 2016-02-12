/**
 * @author aelyseev
 * @date 17/12/15
 */

var url = require('./menu-button.tmpl.html');

module.exports = function () {
	'use strict';

	return {
		restricts: 'A',
		scope: true,
		replace: true,
		link: function (scope, el, attrs) {
			var key = 'enable';
			var enableWatcher = function (v) {
				scope[key] = (v === undefined) ? true : v;
			};

			scope.buttonStyle = attrs.buttonStyle;

			scope.$watch(attrs.enable, enableWatcher);
			attrs.$observe('enable', function (v) {
				enableWatcher(scope.$eval(v));
			});
		},
		transclude: true,
		templateUrl: url
	};
};
