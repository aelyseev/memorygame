/**
 * @author aelyseev
 * @date 17/12/15
 */
var common = require('../../modules/store/actions/actions-common');
var routes = require('../../modules/store/actions/actions-routes');
var puzzle = require('../../modules/store/puzzle-metrics');
var boardActions = require('../../modules/store/actions/actions-board');

// directives
require('../../directives/menu-button');
require('../../directives/puzzle');

app.controller('GameController', [
	'$scope', 'settings', '$timeout', 'AppStore', function ($scope, Settings, $timeout, AppStore) {
		'use strict';

		$scope.puzzleStyle = 'width:' + puzzle.size + 'px; height: ' + puzzle.size + 'px; margin: ' +
			puzzle.space + 'px;' + ' transform: rotate3d(0, 1, 0, 180deg)';

		$scope.boardSize = Math.sqrt(AppStore.getState().board.puzzles.length) * (puzzle.size + (2 * puzzle.space));

		$scope.newgame = function () {
			AppStore.dispatch(boardActions.newGame());
		};

		$scope.gotomenu = function () {
			AppStore.dispatch(routes.menu());
		};

		AppStore.subscribe(function () {
			var state = AppStore.getState();
			$scope.clicks = state.board.clicks;
			$scope.solved = state.board.solved;
			$scope.puzzles = state.board.puzzles;
		});

		AppStore.dispatch(common.nothing());
	}]);
