/**
 * @author aelyseev
 * @date 24/01/16
 */

var uniq = require('lodash/uniq');
var store = require('../store.module');

describe('Library: New Game Generator', function () {
	'use strict';

	var appState;
	var boardNames;
	var actions;

	beforeEach(angular.mock.module(store));

	beforeEach(angular.mock.inject(function (_storeState_, _storeActions_) {
		appState = _storeState_;
		actions = _storeActions_;
		boardNames = appState.getState().board.options.map(function (o) {
			return o.name;
		});
	}));

	it('Verify that all puzzle ids are unique and covers a range', function () {
		boardNames.forEach(function (name) {
			var ids;
			var size = Number(name[0]) * Number(name[0]);
			appState.dispatch(actions.setBoardSize(name));
			appState.dispatch(actions.newGame());
			ids = appState.getState().board.puzzles.map(function (p) {
				return p.id;
			});
			expect(ids).to.deep.equal(uniq(ids));
			expect(ids).to.have.length(size);
		});
	});
});
