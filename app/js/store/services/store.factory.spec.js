/**
 * @author aelyseev
 * @date 26/01/16
 */

var storeModule = require('../store.module');
var intersection = require('lodash/intersection');
var groupBy = require('lodash/groupBy');
var storeFactory = require('./store.factory');
var InitialStateConstructor = require('./initial');

var deepFreez = require('deep-freeze');
var stateDefaults = require('../lib/defaults');

deepFreez(stateDefaults);

describe('Factory: redux store service', function () {
	'use strict';
	var appStore;
	var actionsBuilder;
	var $inject = angular.mock.inject;

	beforeEach(angular.mock.module(storeModule));

	beforeEach(angular.mock.inject(function (_storeState_, _storeActions_) {
		appStore = _storeState_;
		actionsBuilder = _storeActions_;
	}));

	it('Factory appStore is defined', function () {
		expect(appStore).to.be.an('Object');
	});

	it('New game action reset solved and opened, increase lastId, and puzzle has no intersect ids, ' +
		'board.clicks = 0, board.queue = [], board.solved = true', function () {
		var state;
		var lastId;
		var ids1;
		var ids2;

		appStore.dispatch(actionsBuilder.newGame());
		state = appStore.getState();
		ids1 = state.board.puzzles.map(function (puzzle) {return puzzle.id; });
		lastId = state.board.lastId;
		expect(state.board.solved).to.equal(false);
		expect(state.board.queue).to.deep.equal([]);
		expect(state.board.puzzles.filter(function (p) {return p.solved; })).to.deep.equal([]);
		expect(state.board.puzzles.filter(function (p) {return p.open; })).to.deep.equal([]);

		appStore.dispatch(actionsBuilder.newGame());
		state = appStore.getState();
		ids2 = state.board.puzzles.map(function (puzzle) {return puzzle.id; });
		expect(state.board.lastId).to.be.above(lastId);
		expect(intersection(ids1, ids2).length).to.equal(0);
	});

	it('Test click action', function () {
		var clicks;
		var i;
		var state;

		//new game to init puzzles
		appStore.dispatch(actionsBuilder.newGame());

		i = Math.random() * appStore.getState().board.puzzles.length | 0;
		clicks = appStore.getState().board.clicks;
		appStore.dispatch(actionsBuilder.clickPuzzle(i));

		// verify after first click
		state = appStore.getState();
		expect(state.board.clicks).to.equal(clicks + 1);
		expect(state.board.queue).to.contain(i);
		expect(state.board.puzzles[i].open).to.equal(true);
		expect([1, 2]).to.include.members([1, 1]);

		// verify after second click same puzzle
		appStore.dispatch(actionsBuilder.clickPuzzle(i));
		state = appStore.getState();
		expect(state.board.clicks).to.equal(clicks + 1);
		expect(groupBy(state.board.queue)[i].length).to.equal(1);
		expect(state.board.puzzles[i].open).to.equal(true);
	});

	it('Board.dirty is false after game started and become true after any clicks', function () {
		var l;
		var i;

		appStore.dispatch(actionsBuilder.newGame());
		expect(appStore.getState().board.dirty).to.equal(false);

		l = appStore.getState().board.puzzles.length;
		for (i = 0; i < (Math.random() * 10 | 0) + 1; i++) {
			appStore.dispatch(actionsBuilder.clickPuzzle(Math.random() * l | 0));
			expect(appStore.getState().board.dirty).to.equal(true);
		}
		appStore.dispatch(actionsBuilder.checkBoard());
		expect(appStore.getState().board.dirty).to.equal(true);
	});

	it('Board.dirty became false after size switch', function () {
		var l;
		var i;
		var boardname;
		appStore.dispatch(actionsBuilder.newGame());
		l = appStore.getState().board.puzzles.length;
		for (i = 0; i < (Math.random() * 10 | 0) + 1; i++) {
			appStore.dispatch(actionsBuilder.clickPuzzle(Math.random() * l | 0));
			expect(appStore.getState().board.dirty).to.equal(true);
		}
		boardname = appStore.getState().board.options.filter(function (o) {
			return !o.active;
		}).shift().name;
		appStore.dispatch(actionsBuilder.setBoardSize(boardname));
		expect(appStore.getState().board.dirty).to.equal(false);
	});

	it('Check board action — click wrong pair', function () {
		var i;
		var puzzles;
		var notpair;

		appStore.dispatch(actionsBuilder.newGame());

		puzzles = appStore.getState().board.puzzles;
		i = Math.random() * puzzles.length | 0;
		notpair = puzzles.filter(function (puzzle) {
			return (puzzle.pair !== i) && (Math.random() > 0.5);
		}).shift();

		// clicked twice, first open puzzle, second on wrong puzzle
		appStore.dispatch(actionsBuilder.clickPuzzle(i));
		appStore.dispatch(actionsBuilder.checkBoard());
		appStore.dispatch(actionsBuilder.clickPuzzle(notpair.index));
		appStore.dispatch(actionsBuilder.checkBoard());
		puzzles = appStore.getState().board.puzzles;

		expect(puzzles[i].open).to.equal(false);
		expect(puzzles[notpair.index].open).to.equal(false);
		expect(puzzles[i].solved).to.equal(false);
		expect(puzzles[notpair.index].solved).to.equal(false);
	});

	it('Check board action — click correct pair', function () {
		var i;
		var puzzles;
		var pair;

		appStore.dispatch(actionsBuilder.newGame());
		puzzles = appStore.getState().board.puzzles;
		i = Math.random() * puzzles.length | 0;
		pair = puzzles.filter(function (puzzle) {
			return puzzle.pair === i;
		}).shift();

		// clicked twice, first open puzzle, second on wrong puzzle
		appStore.dispatch(actionsBuilder.clickPuzzle(i));
		appStore.dispatch(actionsBuilder.checkBoard());
		appStore.dispatch(actionsBuilder.clickPuzzle(pair.index));
		appStore.dispatch(actionsBuilder.checkBoard());
		puzzles = appStore.getState().board.puzzles;

		expect(puzzles[i].open).to.equal(true);
		expect(puzzles[pair.index].open).to.equal(true);
		expect(puzzles[i].solved).to.equal(true);
		expect(puzzles[pair.index].solved).to.equal(true);
	});

	it('Consequentially clicks correct pairs — whole board became solved', function () {
		var l;
		var puzzles;
		var target;
		var clicked = [];
		var unclicked;

		appStore.dispatch(actionsBuilder.newGame());
		puzzles = appStore.getState().board.puzzles;
		unclicked = puzzles.map(function (puzzle) {
			return puzzle.index;
		});
		l = puzzles.length;
		while (clicked.length < l) {
			target = unclicked.shift();
			appStore.dispatch(actionsBuilder.clickPuzzle(target));
			appStore.dispatch(actionsBuilder.checkBoard());
			appStore.dispatch(actionsBuilder.clickPuzzle(puzzles[target].pair));
			appStore.dispatch(actionsBuilder.checkBoard());
			unclicked.splice(unclicked.indexOf(puzzles[target].pair), 1);
			clicked.push(target, puzzles[target].pair);
		}
		expect(appStore.getState().board.solved).to.equal(true);
	});

	it('State restores correct after application restart', $inject(function ($localStorage, $location, $log) {
		var l;
		var StateA;
		var StateB;
		var store;

		StateA = new InitialStateConstructor($localStorage, $location);
		store = storeFactory($localStorage, $location, StateA, $log);

		// some random actions
		store.dispatch(actionsBuilder.newGame());
		l = store.getState().board.puzzles.length;

		store.dispatch(actionsBuilder.clickPuzzle((Math.random() * l) | 0));
		store.dispatch(actionsBuilder.clickPuzzle((Math.random() * l) | 0));
		store.dispatch(actionsBuilder.clickPuzzle((Math.random() * l) | 0));
		store.dispatch(actionsBuilder.clickPuzzle((Math.random() * l) | 0));
		store.dispatch(actionsBuilder.checkBoard());

		StateB = new InitialStateConstructor($localStorage, $location);

		expect(store.getState().board).to.deep.equal(StateB.getInitialState().board);
	}));
});
