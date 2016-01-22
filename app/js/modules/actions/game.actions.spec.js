/**
 * @author aelyseev
 * @date 22/01/16
 */

/*global beforeEach, before, it*/

var actionsModule = require('./game.actions');

describe('Constant: Game actions', function () {
	'use strict';

	var $inject = angular.mock.inject;

	beforeEach(angular.mock.module(actionsModule));

	it('Module is defined', $inject(function () {
		// will fail in case that module isn't defined
		expect(true).to.equal(true);
	}));
});
