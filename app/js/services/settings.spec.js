/**
 * @author aelyseev
 * @date 14/01/16
 */

describe('Service: Puzzle metrics', function () {
	'use strict';

	var $inject = angular.mock.inject;

	beforeEach(angular.mock.module(app.name));

	it('Settings define an object with methods', $inject(function (settings) {
		expect(settings).to.be.an('object');
		expect(settings.getDefaults).to.be.a('function');
		expect(settings.getState).to.be.a('function');
		expect(settings.getActiveSize).to.be.a('function');
		expect(settings.setState).to.be.a('function');
	}));

	it('Active size is a number', $inject(function (settings) {
		expect(settings.getActiveSize()).to.be.a('number');
	}));

	it('Passing wrong state — active size will be set from defaults', $inject(function (settings) {
		settings.setState('foo');
		expect(settings.getActiveSize()).to.equal(settings.getActiveSize(settings.getDefaults()));
	}));

	it('Test correct states', $inject(function (settings) {
		settings.getDefaults().map(function (state) {
				return state.name;
			})
			.forEach(function (name) {
				settings.setState(name);
				expect(settings.getActiveSize()).to.be.a('number');
			})
		;
	}));
});
