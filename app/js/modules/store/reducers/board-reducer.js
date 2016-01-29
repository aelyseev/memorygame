/**
 * @author aelyseev
 * @date 26/01/16
 */

var actions = require('../actions/actions-common.js');
var generatePuzzles = require('../generate-puzzles');
var State = require('../initial-state');
var initialState = new State();

/**
 * @param {Object} current — current state
 * @returns {Number}
 */
var getBoardSize = function (current) {
	'use strict';

	var filter = function (size) {
		return size.active;
	};

	return parseInt(current.filter(filter).shift().name, 10);
};

/**
 * Returns a new board state configuration
 * @param {Array} sizes
 * @param {String} name
 * @returns {Object}
 */
var updateBoard = function (sizes, name) {
	'use strict';

	var isAnyActiveState = false;
	var newSizes = sizes.map(function (size) {
		isAnyActiveState = isAnyActiveState || (name === size.name);
		return angular.extend({}, size, {active: name === size.name});
	});
	return (isAnyActiveState) ? newSizes : sizes.slice();
};

module.exports = function (board, action) {
	'use strict';

	/** @type Array */
	var puzzles;

	/** @type Number */
	var boardSize;

	var state = board || initialState.board;

	switch (action.type) {
		case actions.SET_BOARD:
			return angular.extend({}, board, {sizes: updateBoard(board.sizes, action.name)});

		case action.CLICK_PUZZLE:
			return angular.extend({}, board, {clicks: board.clicks + 1});

		case actions.NEW_GAME:
			boardSize = getBoardSize(board.sizes);
			puzzles = generatePuzzles(boardSize, board.lastId);
			return angular.extend({}, board, {puzzles: puzzles, lastID: puzzles.length + board.lastId});

		default:
			return angular.extend({}, state);
	}
};
