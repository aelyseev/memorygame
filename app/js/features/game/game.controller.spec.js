/**
 * @author aelyseev
 * @date 13/01/16
 */

/*global beforeEach, before, it*/

describe('Controller: Game', function () {
	'use strict';

	var $controller;
	var ctrl;
	var scope;

	beforeEach(angular.mock.module('app'));

	beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
		ctrl = $controller('GameController', {$scope: scope});
	}));

	it('Game Controller is defined and define a board size', function () {
		expect(ctrl).to.be.a('object');
		expect(scope.boardSize).to.be.a('number');
	});
});
