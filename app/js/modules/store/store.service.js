/**
 * @author aelyseev
 * @date 23/01/16
 */


var actions = require('./store.actions');
var redux = require('redux');
var generatePuzzles = require('./generate-puzzles');

var routeDefault = '/';
var boardNameDefault = '6x6';
var startId = 1;

var state = {
	route: routeDefault,
	board: {
		name: boardNameDefault,
		solved: false,
		lastID: startId,
		puzzles: []
	}
};

var appRoute = function (route, action) {
	'use strict';

	switch (action.type) {
		case actions.GO_TO_MENU:
			return '/';
		case actions.GO_TO_GAME:
			return '/game';

		default:
			return route || routeDefault;
	}
};

var boardReducer = function (board, action) {
	'use strict';

	var boardSize;
	var puzzles;

	switch (action.type) {
		case actions.SET_BOARD:
			return angular.extend({}, board, {name: action.name});

		case actions.NEW_GAME:
			boardSize = Number(board.name[0]);
			puzzles = generatePuzzles(boardSize, board.lastID);
			return angular.extend({}, board, {puzzles: puzzles, lastID: puzzles.length + board.lastID});

		default:
			return board || state.board;
	}
};

var storeReducer = redux.combineReducers({
	route: appRoute,
	board: boardReducer
});

module.exports = redux.createStore(storeReducer, state);
