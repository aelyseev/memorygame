/**
 * @author aelyseev
 * @date 13/01/16
 */

/*global beforeEach, before, it*/

var deepFreeze = require('deep-freeze');

describe('Controller: Game', function () {
	'use strict';

	var $controller;
	var ctrl;
	var scope;

	beforeEach(angular.mock.module(app.name));

	beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_, _AppStore_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
		ctrl = $controller('GameController', {$scope: scope});
	}));

	it('Game Controller is defined and define some scope fields', function () {
		expect(ctrl).to.be.a('object');
		expect(scope.boardSize).to.be.a('number');
		expect(scope.clicks).to.be.at.least(0);
		expect(scope.puzzleStyle).to.be.a('string');
		expect(scope.gotomenu).to.be.a('function');
	});

	describe('GameController side effects', function () {
		it('Controller doesn\'t affect on application state', angular.mock.inject(function ($rootScope, AppStore, _$controller_) {
			var state = AppStore.getState();
			var $gameScope = $rootScope.$new();

			deepFreeze(state);
			_$controller_('GameController', {$scope: $gameScope});

			expect(1).to.equal(1);
		}));
	});
});
