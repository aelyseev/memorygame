/**
 * @author aelyseev
 * @date 26/01/16
 */

var actions = require('../actions/actions.list');
var startNewGame = require('../lib/newgame');
var stateDefaults = require('../lib/defaults');

/**
 * Returns a new board state configuration
 * @param {Object} board
 * @param {String} name
 * @returns {Object}
 */
var updateBoard = function (board, name) {
	'use strict';
	var isAnyActiveState = false;

	var newOptions = board.options.map(function (size) {
		isAnyActiveState = isAnyActiveState || (name === size.name);
		return angular.extend({}, size, {active: name === size.name});
	});

	newOptions = (isAnyActiveState) ? newOptions : board.options.slice();

	return startNewGame(angular.extend({}, board, {options: newOptions}));
};

var checkBoard = function (data) {
	'use strict';
	var pair;
	var board = angular.extend({}, data);
	var puzzles = board.puzzles;

	if (board.queue.length < 2) {
		return data;
	}
	pair = board.queue.splice(0, 2);

	if (puzzles[pair[0]].pair === puzzles[pair[1]].index) {
		puzzles[pair[0]].solved = puzzles[pair[1]].solved = true;
	} else {
		pair.forEach(function (index) {
			puzzles[index].open = false;
		});
	}
	board.solved = puzzles.every(function (puzzle) {
		return puzzle.solved;
	});
	return board;
};

var click = function (data, index) {
	'use strict';

	var board = angular.extend({}, data);
	var puzzle;
	var open;

	if (board.puzzles.length === 0) {
		return data;
	}
	puzzle = board.puzzles[index];
	open = puzzle.open;

	puzzle.open = puzzle.solved || puzzle.open || !open;

	if (puzzle.open && !open) {
		board.queue.push(index);
		board.clicks++;
		board.dirty = true;
		return board;
	}

	return data;
};

module.exports = function (board, action) {
	'use strict';

	var newBoard = board || stateDefaults.board;

	switch (action.type) {
		case actions.SET_BOARD:
			return updateBoard(newBoard, action.name);

		case actions.CLICK_PUZZLE:
			return click(newBoard, action.puzzle);

		case actions.NEW_GAME:
			return startNewGame(newBoard);

		case actions.CHECK_BOARD:
				return checkBoard(newBoard);

		default:
			return newBoard;
	}
};
