/**
 * @author aelyseev
 * @date 26/01/16
 */

var redux = require('redux');
var storeReducer = require('../reducers');
var storageKey = require('../lib/storage-key');

var appStore = function ($localStorage, $location, initial, $log) {
	'use strict';

	var storageMiddleware = function (store) {
		return function (next) {
			return function (action) {
				var result = next(action);

				// save game state
				$localStorage[storageKey] = store.getState();

				if (DEBUG) {
					$log.log(action);
				}
				return result;
			};
		};
	};

	return redux.applyMiddleware(storageMiddleware)(redux.createStore)(storeReducer, initial.getInitialState());
};
appStore.$inject = ['$localStorage', '$location', 'storeInitial', '$log'];

module.exports = appStore;
