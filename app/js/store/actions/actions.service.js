/**
 * @author aelyseev
 * @date 11/02/16
 */

var actions = require('./actions.list');

var build = function (name) {
	'use strict';
	return {type: name};
};

module.exports = function () {
	'use strict';
	return {
		nothing: function () {
			return build(actions.NOTHING);
		},

		newGame: function () {
			return build(actions.NEW_GAME);
		},

		checkBoard: function () {
			return build(actions.CHECK_BOARD);
		},

		setBoardSize: function (boardSizeName) {
			return angular.extend({}, build(actions.SET_BOARD), {name: boardSizeName});
		},

		clickPuzzle: function (puzzleIndex) {
			return angular.extend({}, build(actions.CLICK_PUZZLE), {puzzle: puzzleIndex});
		},

		toGame: function () {
			return build(actions.GO_TO_GAME);
		},

		toMenu: function () {
			return build(actions.GO_TO_MENU);
		},

		routeTo: function (route) {
			return angular.extend({}, build(actions.GO_TO), {route: route});
		}
	};
};
