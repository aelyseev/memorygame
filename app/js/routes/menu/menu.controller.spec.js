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
	var menu;

	beforeEach(angular.mock.module(app.name));

	beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
		menu = $controller('MenuController', {$scope: scope});
	}));

	it('Menu Controller is defined', function () {
		expect(menu.options).to.be.a('array');
		expect(menu.dirty).to.be.a('boolean');
		expect(menu.setSize).to.be.a('function');
		expect(menu.newGame).to.be.a('function');
		expect(menu.resumeGame).to.be.a('function');
	});

	describe('MenuController side effects', function () {
		it('Controller doesn\'t affect on application state', angular.mock.inject(function ($rootScope, storeState, _$controller_) {
			var state = storeState.getState();
			var $gameScope = $rootScope.$new();

			deepFreeze(state);
			_$controller_('MenuController', {$scope: $gameScope});

			expect(1).to.equal(1);
		}));
	});
});
