/**
 * @author aelyseev
 * @date 13/01/16
 */

/*global beforeEach, before, it*/

describe('Controller: Menu', function () {
	'use strict';

	var $controller;
	var scope;

	beforeEach(angular.mock.module(app.name));

	beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
		$controller('MenuController', {$scope: scope});
	}));

	it('Menu Controller is defined and define a board size', function () {
		expect(scope.sizes).to.be.a('array');
		expect(scope.setSize).to.be.a('function');
		expect(scope.newgame).to.be.a('function');
	});
});
