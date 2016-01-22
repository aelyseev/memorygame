/**
 * @author aelyseev
 * @date 22/01/16
 */

module.exports = angular.module('game.actions', [])
	// route actions
	.constant('GO_TO_MENU', 'GO_TO_MENU')
	.constant('GO_TO_GAME', 'GO_TO_GAME')

	// main menu
	.constant('SET_BOARD', 'SET_BOARD')

	// game actions
	.constant('NEW_GAME', 'NEW_GAME')
	.constant('CLICK_PUZZLE', 'CLICK_PUZZLE')
	.constant('ROTATE_PUZZLE', 'ROTATE_PUZZLE')
	.name;
