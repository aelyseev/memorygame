/**
 * @author aelyseev
 * @date 26/01/16
 */

var actions = require('./actions');
var redux = require('redux');
var storeReducer = require('./reducers');

var Store = function ($localStorage, $location, State) {
	'use strict';

	var storageMiddleware = function (store) {
		return function (next) {
			return function (action) {
				var result = next(action);
				if (action.type === actions.SET_BOARD) {
					$localStorage.sizes = store.getState().board.sizes;
				}
				return result;
			};
		};
	};

	var createStore = redux.applyMiddleware(storageMiddleware)(redux.createStore);

	return createStore(storeReducer, State.getInitialState());
};

Store.$inject = ['$localStorage', '$location', 'State'];

module.exports = Store;
