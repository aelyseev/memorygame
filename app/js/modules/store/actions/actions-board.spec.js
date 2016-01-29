/**
 * @author aelyseev
 * @date 31/01/16
 */

var actions = require('./actions-board');

describe('Libraries:Store Actions-Board', function () {
	'use strict';
	var action;

	it('Check clickPuzzle builder', function () {
		action = actions.clickPuzzle(1);
		expect(action).to.be.an('object');
		expect(action.type).to.be.an('string');
		expect(action.puzzle).to.be.an('number');
	});

	it('Check newGame builder', function () {
		action = actions.newGame();
		expect(action).to.be.an('object');
		expect(action.type).to.be.an('string');
	});

	it('Check setBoardSize builder', function () {
		action = actions.setBoardSize('sample');
		expect(action).to.be.an('object');
		expect(action.type).to.be.an('string');
		expect(action.name).to.be.an('string');
	});
});
