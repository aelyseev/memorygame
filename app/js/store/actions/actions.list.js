/**
 * @author aelyseev
 * @date 29/01/16
 */

/*eslint strict: 0*/

var actions = {};

Object.defineProperties(actions, {
	// init
	NOTHING: {get: function () {return 'REALLY_@@_NOTHING_HAPPENS'; }},

	// route actions
	GO_TO_MENU: {get: function () {return 'GO_TO_MENU'; }},
	GO_TO_GAME: {get: function () {return 'GO_TO_GAME'; }},
	GO_TO: {get: function () {return 'GO_TO'; }},

	// board actions
	NEW_GAME: {get: function () {return 'NEW_GAME'; }},
	SET_BOARD: {get: function () {return 'SET_BOARD'; }},
	CLICK_PUZZLE: {get: function () {return 'CLICK_PUZZLE'; }},
	ROTATE_PUZZLE: {get: function () {return 'ROTATE_PUZZLE'; }},
	CHECK_BOARD: {get: function () {return 'CHECK_BOARD'; }}
});

module.exports = actions;
