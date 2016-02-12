/**
 * @author aelyseev
 * @date 27/01/16
 */

/*global VERSION*/

var storageKey = require('../lib/storage-key');
var newgame = require('../lib/newgame');
var stateDefaults = require('../lib/defaults');

var State = function ($localStorage, $location) {
	'use strict';
	this.storage = $localStorage;
	this.location = $location;
};

State.prototype = {
	storage: null,

	getInitialState: function () {
		'use strict';
		var state = angular.extend({}, stateDefaults, this.storage && this.storage[storageKey]);
		var board = state.board;

		board = (board.puzzles.length) ? board : newgame(board);

		return angular.extend({}, state, {board: board}, {route: this.location.url()});
	}
};

State.$inject = ['$localStorage', '$location'];

module.exports = State;
