/**
 * @author aelyseev
 * @date 17/12/15
 */
var puzzle = {
	size: 52,
	space: 6
};

var GameController = function ($scope, appState, actions) {
	'use strict';
	var t = this;

	$scope.puzzleStyle = 'width:' + puzzle.size + 'px; height: ' + puzzle.size + 'px; margin: ' +
		puzzle.space + 'px;' + ' transform: rotate3d(0, 1, 0, 180deg)';

	this.boardSize = Math.sqrt(appState.getState().board.puzzles.length) * (puzzle.size + (2 * puzzle.space));

	this.appState = appState;
	this.actions = actions;

	appState.subscribe(function () {
		t._update();
	});

	this._update();
};

GameController.prototype = {
	puzzleStyle: '',
	boardSize: 0,
	appState: null,
	actions: null,
	click: 0,
	solved: false,
	puzzles: null,

	_update: function () {
		'use strict';
		var state = this.appState.getState();
		this.clicks = state.board.clicks;
		this.solved = state.board.solved;
		this.puzzles = state.board.puzzles;
	},

	newGame: function () {
		'use strict';
		this.appState.dispatch(this.actions.newGame());
	},

	gotoMenu: function () {
		'use strict';
		this.appState.dispatch(this.actions.toMenu());
	}
};

GameController.$inject = ['$scope', 'storeState', 'storeActions'];

module.exports = GameController;
