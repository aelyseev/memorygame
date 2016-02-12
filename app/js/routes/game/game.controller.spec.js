/**
 * @author aelyseev
 * @date 13/01/16
 */

/*global beforeEach, before, it*/

var deepFreeze = require('deep-freeze');

describe('Controller: Game', function () {
	'use strict';

	var $controller;
	var scope;
	var game;

	beforeEach(angular.mock.module(app.name));

	beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_) {
		scope = _$rootScope_.$new();
		$controller = _$controller_;
		game = $controller('GameController', {$scope: scope});
	}));

	it('Game Controller is defined', function () {
		expect(game.boardSize).to.be.a('number');
		expect(game.clicks).to.be.at.least(0);
		expect(game.newGame).to.be.a('function');
		expect(game.gotoMenu).to.be.a('function');

		expect(scope.puzzleStyle).to.be.a('string');
		expect(scope.puzzleStyle).to.contains('width');
		expect(scope.puzzleStyle).to.contains('height');
	});

	describe('GameController side effects', function () {
		it('Controller doesn\'t affect on application state', angular.mock.inject(function ($rootScope, storeState, _$controller_) {
			var state = storeState.getState();
			var $gameScope = $rootScope.$new();

			deepFreeze(state);
			_$controller_('GameController', {$scope: $gameScope});

			expect(1).to.equal(1);
		}));
	});
});
