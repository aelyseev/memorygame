/**
 * @author aelyseev
 * @date 01/02/16
 */

var storeModule = require('./store.module');

describe('Service: InitialState', function () {
	'use strict';

	var State;

	beforeEach(angular.mock.module(storeModule));

	beforeEach(angular.mock.inject(function (_InitialState_, $localStorage) {
		State = _InitialState_;
		$localStorage.$reset();
	}));

	it('Service is defined', function () {
		expect(State).to.be.an('object');
	});

	describe('Verify getInitialState structure', function () {
		var state;
		var defaults;

		before(function () {
			state = State.getInitialState();
			defaults = State.getDefaults();
		});

		it('Initial state is an object', function () {
			expect(state).to.be.an('object');
		});

		it('Initial state.route is a string', function () {
			expect(state.route).to.be.an('string');
		});

		it('Initial state.board is an object', function () {
			expect(state.board).to.be.an('object');
		});

		it('Initial state.board.options is an array', function () {
			expect(state.board.options).to.be.an('array');
		});

		it('Initial state.board.dirty is a boolean', function () {
			expect(state.board.dirty).to.be.a('boolean');
		});

		it('Initial state.board.options is an array', function () {
			expect(state.board.options).to.be.an('array');
		});

		it('Initial state.board.solved is a boolean', function () {
			expect(state.board.solved).to.be.a('boolean');
		});

		it('Initial state.board.lastId is at least 1', function () {
			expect(defaults.board.lastId).to.equal(1);
			expect(state.board.lastId).to.be.at.least(16);
		});

		it('Initial state.board.clicks is at least 0', function () {
			expect(state.board.clicks).to.be.at.least(0);
		});

		it('Initial state.board.puzzles is an array', function () {
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
