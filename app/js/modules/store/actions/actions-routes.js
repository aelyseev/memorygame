/**
 * @author aelyseev
 * @date 28/01/16
 */

var actions = require('./index');
var common = require('./actions-common');

module.exports = {
	game: function () {
		'use strict';
		return common.build(actions.GO_TO_GAME);
	},
	menu: function () {
		'use strict';
		return common.build(actions.GO_TO_MENU);
	}
};
