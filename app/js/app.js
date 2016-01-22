/**
 * @author aelyseev
 * @date 15/12/15
 */

var actions = require('./modules/actions/game.actions');

module.exports = angular.module('game', [
	'ngRoute', 'ngStorage', actions
]);
