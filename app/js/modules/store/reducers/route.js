/**
 * @author aelyseev
 * @date 27/01/16
 */
var actions = require('../actions');
var State = require('../initial-state');
var initialState = new State();

module.exports = function (route, action) {
	'use strict';

	switch (action.type) {
		case actions.GO_TO_GAME:
			return '/game';

		case actions.GO_TO_MENU:
			return '/';

		case actions.GO_TO:
			return action.route;

		default:
			return route || initialState.getDefaults().route;
	}
};
