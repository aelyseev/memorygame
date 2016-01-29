/**
 * @author aelyseev
 * @date 13/01/16
 */

/*global beforeEach, before, it*/

var deepFreeze = require('deep-freeze');

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
		expect(scope.options).to.be.a('array');
		expect(scope.dirty).to.be.a('boolean');
		expect(scope.setSize).to.be.a('function');
		expect(scope.newGame).to.be.a('function');
		expect(scope.resumeGame).to.be.a('function');
	});

	describe('MenuController side effects', function () {
		it('Controller doesn\'t affect on application state', angular.mock.inject(function ($rootScope, AppStore, _$controller_) {
			var state = AppStore.getState();
			var $gameScope = $rootScope.$new();

			deepFreeze(state);
			_$controller_('MenuController', {$scope: $gameScope});

			expect(1).to.equal(1);
		}));
	});
});
