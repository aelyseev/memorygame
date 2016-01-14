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
		return angular.extend([], defaults);
	};

	this.getState = function () {
		var state = $localStorage.state;

		if (!state) {
			$localStorage.state = state = this.getDefaults();
		}

		// to drop incompatible states
		return this.getDefaults().map(function (s, i) {
			return angular.extend({}, s, state[i]);
		});
	};

	this.getActiveSize = function (data) {
		var filter = function (state) {
			return state.active;
		};
		var states = data || this.getState();
		var activeState = states.filter(filter).shift() || this.getDefaults().filter(filter).shift();
		return Number(activeState.name[0]);
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
