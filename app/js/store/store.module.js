/**
 * @author aelyseev
 * @date 23/01/16
 */

var store = require('./services/store.factory');
var initial = require('./services/initial');
var actionsBuilder = require('./actions/actions.service');

module.exports = angular.module('game.store', ['ngStorage'])
	.config(['$localStorageProvider', function ($localStorageProvider) {
		'use strict';
		$localStorageProvider.setKeyPrefix('game_');
	}])
	.service('storeInitial', initial)
	.factory('storeActions', actionsBuilder)
	.factory('storeState', store)
	.name;
