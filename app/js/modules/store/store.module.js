/**
 * @author aelyseev
 * @date 23/01/16
 */

var AppStore = require('./store.factory');
var State = require('./initial-state');

module.exports = angular.module('game.store', ['ngStorage'])
	.config(['$localStorageProvider', function ($localStorageProvider) {
		'use strict';
		$localStorageProvider.setKeyPrefix('game_');
	}])
	.service('InitialState', State)
	.factory('AppStore', AppStore)
	.name;
