/**
 * @author aelyseev
 * @date 27/01/16
 */

var State = require('../initial-state');
var reducer = require('./board-reducer');
var boardActions = require('../actions/actions-board');
var deepFreeze = require('deep-freeze');

describe('Reducers: Board reducer', function () {
	'use strict';

	var initialState = (new State()).getDefaults().board;
	deepFreeze(initialState);

	it('Reducer is a pure function', function () {
		reducer(initialState, boardActions.clickPuzzle(2));
		reducer(initialState, boardActions.setBoardSize('2'));
		reducer(initialState, boardActions.newGame());
		expect(1).to.equal(1);
	});
});
