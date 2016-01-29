/**
 * @author aelyseev
 * @date 24/01/16
 */

var uniq = require('lodash/uniq');
var findIndex = require('lodash/findIndex');
var bind = require('lodash/bind');
var storeModule = require('./store.module');
var boardActions = require('./actions/actions-board');

describe('Library: New Game Generator', function () {
	'use strict';
	var AppStore;
	var boardNames;

	beforeEach(angular.mock.module(storeModule));

	beforeEach(angular.mock.inject(function (_AppStore_) {
		AppStore = _AppStore_;
		boardNames = AppStore.getState().board.options.map(function (o) {
			return o.name;
		});
	}));

	it('Verify that all puzzle ids are unique and covers a range', function () {
		boardNames.forEach(function (name) {
			var ids;
			var size = Number(name[0]) * Number(name[0]);
			AppStore.dispatch(boardActions.setBoardSize(name));
			AppStore.dispatch(boardActions.newGame());
			ids = AppStore.getState().board.puzzles.map(function (p) {
				return p.id;
			});
			expect(ids).to.deep.equal(uniq(ids));
			expect(ids).to.have.length(size);
		});
	});
});
