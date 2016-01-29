/**
 * @author aelyseev
 * @date 27/01/16
 */

var sizeDefaults = [
	{name: '4×4', active: false},
	{name: '6×6', active: true},
	{name: '8×8', active: false}
];

var defaults = {
	route: '/',
	board: {
		sizes: sizeDefaults,
		solved: false,
		lastId: 1,
		clicks: 0,
		puzzles: []
	}
};

var State = function ($localStorage) {
	'use strict';
	this.storage = $localStorage;
};

State.prototype = {
	storage: null,

	getDefaults: function () {
		'use strict';
		return defaults;
	},

	getInitialState: function () {
		'use strict';

		var board = angular.extend({}, defaults.board, {sizes: this._initalSizes()});
		return angular.extend({}, defaults, {board: board});
	},

	_loadSizes: function () {
		'use strict';

		return (this.storage && this.storage.sizes) || {};
	},

	_initalSizes: function () {
		'use strict';

		var sizes = this._loadSizes();
		var defaultSizes = sizeDefaults.slice();

		// to drop incompatible states
		return defaultSizes.map(function (size, i) {
			return angular.extend({}, size, sizes[i]);
		});
	}
};

State.$injects = ['$localStorage'];

module.exports = State;
