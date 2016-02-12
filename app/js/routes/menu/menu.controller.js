/**
 * @author aelyseev
 * @date 17/12/15
 */

var MenuController = function (appState, actions) {
	'use strict';
	var t = this;

	this.appState = appState;
	this.actions = actions;

	appState.subscribe(function () {
		t._update();
	});

	this._update();
};

MenuController.prototype = {
	appState: null,
	actions: null,
	dirty: null,
	options: null,

	_update: function () {
		'use strict';
		var state = this.appState.getState();
		this.options = state.board.options;
		this.dirty = state.board.dirty;
	},

	setSize: function (name) {
		'use strict';
		this.appState.dispatch(this.actions.setBoardSize(name));
	},

	resumeGame: function () {
		'use strict';
		this.appState.dispatch(this.actions.toGame());
	},

	newGame: function () {
		'use strict';
		if (this.appState.getState().board.solved) {
			this.appState.dispatch(this.actions.newGame());
		}
		this.appState.dispatch(this.actions.toGame());
	}
};

MenuController.$inject = ['storeState', 'storeActions'];

module.exports = MenuController;

