/**
 * @author aelyseev
 * @date 27/01/16
 */

/*global VERSION*/

var storageKey = require('./storage-key');
var newgame = require('./newgame-generator');

var optionsDefault = [
	{name: '4×4', active: false},
	{name: '6×6', active: true},
	{name: '8×8', active: false}
];

var puzzle = require('./puzzle-metrics');

var defaults = {
	route: '/',
	board: {
		dirty: false,
		options: optionsDefault,
		queue: [],
		solved: false,
		lastId: 1,
		clicks: 0,
		puzzles: []
	}
};

var State = function ($localStorage, $location) {
	'use strict';
	this.storage = $localStorage;
	this.location = $location;
};

State.prototype = {
	storage: null,

	getDefaults: function () {
		'use strict';
		return defaults;
	},

	getInitialState: function () {
		'use strict';
		var state = angular.extend({}, this.getDefaults(), this.storage && this.storage[storageKey]);
		var board = state.board;

		board = (board.puzzles.length) ? board : newgame(board);

		return angular.extend({}, state, {board: board}, {route: this.location.url()});
	}
};

State.$injects = ['$localStorage', '$location'];

module.exports = State;
