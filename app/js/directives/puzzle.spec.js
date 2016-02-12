/**
 * @author aelyseev
 * @date 10/02/16
 */

describe('Directives: puzzle', function () {
	'use strict';
	var $scope;
	var $compile;

	beforeEach(angular.mock.module(app.name));

	beforeEach(angular.mock.inject(function (_$compile_, $rootScope) {
		$scope = $rootScope.$new();
		$compile = _$compile_;
	}));

	it('Directive is defined', function () {
		var $el = $compile('<div puzzle></div>')($scope);
		$scope.$digest();

		expect($el.hasClass('puzzle')).to.equal(true);
	});
});
