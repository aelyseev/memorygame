/**
 * @author aelyseev
 * @date 17/12/15
 */

var commonActions = require('../../modules/store/actions/actions-common');
var routeActions = require('../../modules/store/actions/actions-routes');
var boardActions = require('../../modules/store/actions/actions-board');

// new button
require('../../directives/menu-button');

app.controller('MenuController', [
	'$scope', '$location', 'settings', 'AppStore',
	function ($scope, $location, Settings, AppStore) {
		'use strict';

		AppStore.subscribe(function () {
			var state = AppStore.getState();
			$scope.options = state.board.options;
			$scope.dirty = state.board.dirty;
		});

		$scope.test = function () {
			console.log('test');
		};

		$scope.setSize = function (name) {
			AppStore.dispatch(boardActions.setBoardSize(name));
		};

		$scope.newGame = function () {
			if ($scope.dirty) {
				AppStore.dispatch(boardActions.newGame());
			}
			AppStore.dispatch(routeActions.toGame());
		};

		$scope.resumeGame = function () {
			AppStore.dispatch(routeActions.toGame());
		};

		AppStore.dispatch(commonActions.nothing());
	}]);
