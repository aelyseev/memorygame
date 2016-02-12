/**
 * @author aelyseev
 * @date 27/01/16
 */

var Initial = require('../services/initial');
var reducer = require('./board-reducer');
var deepFreeze = require('deep-freeze');
var store = require('../store.module');

var stateDefaults = require('../lib/defaults');
deepFreeze(stateDefaults);

describe('Reducers: Board reducer', function () {
	'use strict';

	var actions;

	beforeEach(angular.mock.module(store));

	beforeEach(angular.mock.inject(function (_storeActions_) {
		actions = _storeActions_;
	}));

	it('Board reducer is a pure function', function () {
		reducer(stateDefaults.board, actions.clickPuzzle(2));
		reducer(stateDefaults.board, actions.setBoardSize('2'));
		reducer(stateDefaults.board, actions.newGame());
		expect(1).to.equal(1);
	});
});
