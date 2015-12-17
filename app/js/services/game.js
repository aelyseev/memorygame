/**
 * @author aelyseev
 * @date 17/12/15
 */

var app = require('./app');

app.service('game', ['$localStorage', function ($localStorage) {
	'use strict';

	this.newgame = function () {};
	this.savegame = function () {};
}]);
