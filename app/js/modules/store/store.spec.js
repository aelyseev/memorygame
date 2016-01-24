/**
 * @author aelyseev
 * @date 23/01/16
 */

var assign = require('lodash/assign');

describe('Service: store service', function () {
	'use strict';

	var store = require('./store.js');
	var actions = require('./store.actions');

	it('Reduces are pure functions', function () {
		var state = store.getState();
		store.dispatch({type: actions.GO_TO_GAME});
		expect(state).to.not.deep.equal(store.getState());

		state = store.getState();
		store.dispatch({type: actions.GO_TO_MENU});
		expect(state).to.not.deep.equal(store.getState());

		state = store.getState();
		store.dispatch({type: actions.SET_BOARD, name: '4x4'});
		expect(state).to.not.deep.equal(store.getState());

		state = store.getState();
		store.dispatch({type: actions.NEW_GAME});
		expect(state).to.not.deep.equal(store.getState());
	});
});
