/**
 * @author aelyseev
 * @date 26/01/16
 */

var storeModule = require('./store.module');
var actions = require('./actions/actions-common');
var deepFreeze = require('deep-freeze');

describe('Factory: redux store service', function () {
	'use strict';

	var $inject = angular.mock.inject;
	var state;

	beforeEach(angular.mock.module(storeModule));

	it('Module game.store is initiated successfuly', function () {
		expect(1).to.equal(1);
	});
});
