/**
 * @author aelyseev
 * @date 28/01/16
 */

var common = require('./actions-common');
var actions = require('./index');

module.exports = {
	newGame: function () {
		'use strict';
		return common.build(actions.NEW_GAME);
	},

	checkBoard: function () {
		'use strict';
		return common.build(actions.CHECK_BOARD);
	},

	setBoardSize: function (boardSizeName) {
		'use strict';
		return angular.extend({}, common.build(actions.SET_BOARD), {name: boardSizeName});
	},

	clickPuzzle: function (puzzleIndex) {
		'use strict';
		return angular.extend({}, common.build(actions.CLICK_PUZZLE), {puzzle: puzzleIndex});
	}
};
