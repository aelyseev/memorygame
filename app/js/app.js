/**
 * @author aelyseev
 * @date 15/12/15
 */

var storeModule = require('./modules/store/store.module');

module.exports = angular.module('game', [
	'ngRoute', 'ngStorage', storeModule
]);
