/**
 * @author aelyseev
 * @date 26/01/16
 */

var storeModule = require('./store.module');

describe('Module: game.store', function () {
	'use strict';

	beforeEach(angular.mock.module(storeModule));

	it('Module game store initiates successfuly', function () {
		expect(1).to.equal(1);
	});
});
