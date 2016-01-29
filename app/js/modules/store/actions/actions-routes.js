/**
 * @author aelyseev
 * @date 28/01/16
 */

var actions = require('./index');
var common = require('./actions-common');

module.exports = {
	toGame: function () {
		'use strict';
		return common.build(actions.GO_TO_GAME);
	},
	routeTo: function (route) {
		'use strict';
		return angular.extend({}, common.build(actions.GO_TO), {route: route});
	},
	menu: function () {
		'use strict';
		return common.build(actions.GO_TO_MENU);
	}
};
