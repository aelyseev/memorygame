/**
 * @author aelyseev
 * @date 26/01/16
 */

var redux = require('redux');
var storeReducer = require('./reducers');
var storageKey = require('./storage-key');

var Store = function ($localStorage, $location, State, $log) {
	'use strict';

	var storageMiddleware = function (store) {
		return function (next) {
			return function (action) {
				var result = next(action);

				// save game state
				$localStorage[storageKey] = store.getState();

				$log.log(action);
				return result;
			};
		};
	};

	return redux.applyMiddleware(storageMiddleware)(redux.createStore)(storeReducer, State.getInitialState());
};
Store.$inject = ['$localStorage', '$location', 'InitialState', '$log'];

module.exports = Store;
