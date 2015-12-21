/**
 * @author aelyseev
 * @date 21/12/15
 */

var app = require('../app');

app.service('settings', ['$localStorage', function ($localStorage) {
	'use strict';
	var defaults = [
		{name: '2×2', active: false},
		{name: '4×4', active: false},
		{name: '6×6', active: true},
		{name: '8×8', active: false}
	];

	this.getState = function () {
		var state = $localStorage.state;

		return defaults.map(function (s, i) {
			return angular.extend({}, s, state[i]);
		});
	};

	this.getActiveSize = function () {
		var activeName = this.getState().filter(function (state) {
			return state.active;
		})[0].name;
		return Number(activeName[0]);
	};

	this.setState = function (name) {
		var newstate = this.getState().map(function (state) {
			state.active = state.name === name;
			return state;
		});
		$localStorage.state = newstate;
		return newstate;
	};
}]);
