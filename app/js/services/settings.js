/**
 * @author aelyseev
 * @date 21/12/15
 */

app.service('settings', ['$localStorage', function ($localStorage) {
	'use strict';
	var defaults = [
		{name: '4×4', active: false},
		{name: '6×6', active: true},
		{name: '8×8', active: false}
	];

	this.getDefaults = function () {
		return defaults;
	};

	this.getState = function () {
		var state = $localStorage.state;

		if (!state) {
			$localStorage.state = state = defaults;
		}

		// to drop incompatible states
		return defaults.map(function (s, i) {
			return angular.extend({}, s, state[i]);
		});
	};

	this.getActiveSize = function () {
		var filter = function (state) {
			return state.active;
		};
		var activeName = this.getState().filter(filter).concat(defaults.filter(filter)).shift().name;
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
