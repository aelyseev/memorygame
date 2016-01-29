/**
 * @author aelyseev
 * @date 14/01/16
 */

/*global beforeEach, before, it*/

describe('Service: Puzzle metrics', function () {
	'use strict';

	var $inject = angular.mock.inject;

	beforeEach(angular.mock.module(app.name));

	it('Puzzle metrics defines an object', $inject(function (puzzleMetrics) {
		expect(puzzleMetrics).to.be.an('object');
	}));
});
