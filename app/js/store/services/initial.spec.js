/**
 * @author aelyseev
 * @date 01/02/16
 */

var storeModule = require('../store.module');
var defaults = require('../lib/defaults');

describe('Service: storeInitial', function () {
	'use strict';

	var stateInitial;

	beforeEach(angular.mock.module(storeModule));

	beforeEach(angular.mock.inject(function (_storeInitial_, $localStorage) {
		stateInitial = _storeInitial_;
		$localStorage.$reset();
	}));

	it('Service is defined', function () {
		expect(stateInitial).to.be.an('object');
	});

	describe('Verify getInitialState structure', function () {
		var state;

		before(function () {
			state = stateInitial.getInitialState();
		});

		it('state is an object', function () {
			expect(state).to.be.an('object');
		});

		it('state.route is a string', function () {
			expect(state.route).to.be.an('string');
		});

		it('state.board is an object', function () {
			expect(state.board).to.be.an('object');
		});

		it('state.board.options is an array', function () {
			expect(state.board.options).to.be.an('array');
		});

		it('state.board.dirty is a boolean', function () {
			expect(state.board.dirty).to.be.a('boolean');
		});

		it('state.board.options is an array', function () {
			expect(state.board.options).to.be.an('array');
		});

		it('state.board.solved is a boolean', function () {
			expect(state.board.solved).to.be.a('boolean');
		});

		it('state.board.lastId is at least 1', function () {
			expect(defaults.board.lastId).to.equal(1);
			expect(state.board.lastId).to.be.at.least(16);
		});

		it('Initial state.board.clicks is at least 0', function () {
			expect(state.board.clicks).to.be.at.least(0);
		});

		it('state.board.puzzles is an array', function () {
			expect(state.board.puzzles).to.be.an('array');
			expect(state.board.puzzles.length).to.be.at.least(1);
		});

		it('Initial and default option has one active size', function () {
			var filter = function (option) {
				return option.active;
			};
			expect(defaults.board.options.filter(filter).length).to.equal(1);
			expect(state.board.options.filter(filter).length).to.equal(1);
		});

		it('All options\'s names can be convert to a number', function () {
			var iterator = function (option) {
				expect(parseInt(option.name, 10)).to.be.at.least(4);
			};
			defaults.board.options.forEach(iterator);
			state.board.options.forEach(iterator);
		});
	});
});
