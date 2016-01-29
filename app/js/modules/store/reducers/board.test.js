/**
 * @author aelyseev
 * @date 27/01/16
 */

var State = require('../initial-state');
var reducer = require('./board-reducer');
var actions = require('../actions');
var deepFreeze = require('deep-freeze');

describe.only('Reducers: Board reducer', function () {
	'use strict';

	var initialState = (new State()).getDefaults().board;
	deepFreeze(initialState);

	it('Reducer is a pure function', function () {
		reducer(initialState, {type: actions.CLICK_PUZZLE});
		reducer(initialState, {type: actions.SET_BOARD});
		reducer(initialState, {type: actions.NEW_GAME});
		expect(1).to.equal(1);
	});
});
