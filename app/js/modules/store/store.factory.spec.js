/**
 * @author aelyseev
 * @date 26/01/16
 */

var storeModule = require('./store.module');
var actions = require('./actions/actions-common');
var boardActions = require('./actions/actions-board');
var intersection = require('lodash/intersection');
var groupBy = require('lodash/groupBy');

var storeFactory = require('./store.factory');
var InitialStateConstructor = require('./initial-state');

describe('Factory: redux store service', function () {
	'use strict';
	var AppStore;
	var $inject = angular.mock.inject;

	beforeEach(angular.mock.module(storeModule));

	beforeEach(angular.mock.inject(function (_AppStore_) {
		AppStore = _AppStore_;
	}));

	it('Factory AppStore is defined', function () {
		expect(AppStore).to.be.an('Object');
	});

	it('New game action reset solved and opened, increase lastId, and puzzle has no intersect ids, ' +
		'board.clicks = 0, board.queue = [], board.solved = true', function () {
		var state;
		var lastId;
		var ids1;
		var ids2;

		AppStore.dispatch(boardActions.newGame());
		state = AppStore.getState();
		ids1 = state.board.puzzles.map(function (puzzle) {return puzzle.id; });
		lastId = state.board.lastId;
		expect(state.board.solved).to.equal(false);
		expect(state.board.queue).to.deep.equal([]);
		expect(state.board.puzzles.filter(function (p) {return p.solved; })).to.deep.equal([]);
		expect(state.board.puzzles.filter(function (p) {return p.open; })).to.deep.equal([]);

		AppStore.dispatch(boardActions.newGame());
		state = AppStore.getState();
		ids2 = state.board.puzzles.map(function (puzzle) {return puzzle.id; });
		expect(state.board.lastId).to.be.above(lastId);
		expect(intersection(ids1, ids2).length).to.equal(0);
	});

	it('Test click action', function () {
		var clicks;
		var i;
		var state;

		//new game to init puzzles
		AppStore.dispatch(boardActions.newGame());

		i = Math.random() * AppStore.getState().board.puzzles.length | 0;
		clicks = AppStore.getState().board.clicks;
		AppStore.dispatch(boardActions.clickPuzzle(i));

		// verify after first click
		state = AppStore.getState();
		expect(state.board.clicks).to.equal(clicks + 1);
		expect(state.board.queue).to.contain(i);
		expect(state.board.puzzles[i].open).to.equal(true);
		expect([1, 2]).to.include.members([1, 1]);

		// verify after second click same puzzle
		AppStore.dispatch(boardActions.clickPuzzle(i));
		state = AppStore.getState();
		expect(state.board.clicks).to.equal(clicks + 1);
		expect(groupBy(state.board.queue)[i].length).to.equal(1);
		expect(state.board.puzzles[i].open).to.equal(true);
	});

	it('Board.dirty is false after game started and become true after any clicks', function () {
		var l;
		var i;

		AppStore.dispatch(boardActions.newGame());
		expect(AppStore.getState().board.dirty).to.equal(false);

		l = AppStore.getState().board.puzzles.length;
		for (i = 0; i < (Math.random() * 10 | 0) + 1; i++) {
			AppStore.dispatch(boardActions.clickPuzzle(Math.random() * l | 0));
			expect(AppStore.getState().board.dirty).to.equal(true);
		}
		AppStore.dispatch(boardActions.checkBoard());
		expect(AppStore.getState().board.dirty).to.equal(true);
	});

	it('Board.dirty became false after size switch', function () {
		var l;
		var i;
		var boardname;
		AppStore.dispatch(boardActions.newGame());
		l = AppStore.getState().board.puzzles.length;
		for (i = 0; i < (Math.random() * 10 | 0) + 1; i++) {
			AppStore.dispatch(boardActions.clickPuzzle(Math.random() * l | 0));
			expect(AppStore.getState().board.dirty).to.equal(true);
		}
		boardname = AppStore.getState().board.options.filter(function (o) {
			return !o.active;
		}).shift().name;
		AppStore.dispatch(boardActions.setBoardSize(boardname));
		expect(AppStore.getState().board.dirty).to.equal(false);
	});

	it('Check board action — click wrong pair', function () {
		var i;
		var puzzles;
		var notpair;

		AppStore.dispatch(boardActions.newGame());

		puzzles = AppStore.getState().board.puzzles;
		i = Math.random() * puzzles.length | 0;
		notpair = puzzles.filter(function (puzzle) {
			return (puzzle.pair !== i) && (Math.random() > 0.5);
		}).shift();

		// clicked twice, first open puzzle, second on wrong puzzle
		AppStore.dispatch(boardActions.clickPuzzle(i));
		AppStore.dispatch(boardActions.checkBoard());
		AppStore.dispatch(boardActions.clickPuzzle(notpair.index));
		AppStore.dispatch(boardActions.checkBoard());
		puzzles = AppStore.getState().board.puzzles;

		expect(puzzles[i].open).to.equal(false);
		expect(puzzles[notpair.index].open).to.equal(false);
		expect(puzzles[i].solved).to.equal(false);
		expect(puzzles[notpair.index].solved).to.equal(false);
	});

	it('Check board action — click correct pair', function () {
		var i;
		var puzzles;
		var pair;

		AppStore.dispatch(boardActions.newGame());
		puzzles = AppStore.getState().board.puzzles;
		i = Math.random() * puzzles.length | 0;
		pair = puzzles.filter(function (puzzle) {
			return puzzle.pair === i;
		}).shift();

		// clicked twice, first open puzzle, second on wrong puzzle
		AppStore.dispatch(boardActions.clickPuzzle(i));
		AppStore.dispatch(boardActions.checkBoard());
		AppStore.dispatch(boardActions.clickPuzzle(pair.index));
		AppStore.dispatch(boardActions.checkBoard());
		puzzles = AppStore.getState().board.puzzles;

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

		AppStore.dispatch(boardActions.newGame());
		puzzles = AppStore.getState().board.puzzles;
		unclicked = puzzles.map(function (puzzle) {
			return puzzle.index;
		});
		l = puzzles.length;
		while (clicked.length < l) {
			target = unclicked.shift();
			AppStore.dispatch(boardActions.clickPuzzle(target));
			AppStore.dispatch(boardActions.checkBoard());
			AppStore.dispatch(boardActions.clickPuzzle(puzzles[target].pair));
			AppStore.dispatch(boardActions.checkBoard());
			unclicked.splice(unclicked.indexOf(puzzles[target].pair), 1);
			clicked.push(target, puzzles[target].pair);
		}
		expect(AppStore.getState().board.solved).to.equal(true);
	});

	it('State restores correct after application restart', $inject(function ($localStorage, $location, $log) {
		var l;
		var StateA;
		var StateB;
		var Store;

		StateA = new InitialStateConstructor($localStorage, $location);
		Store = storeFactory($localStorage, $location, StateA, $log);

		// some random actions
		Store.dispatch(boardActions.newGame());
		l = Store.getState().board.puzzles.length;

		Store.dispatch(boardActions.clickPuzzle((Math.random() * l) | 0));
		Store.dispatch(boardActions.clickPuzzle((Math.random() * l) | 0));
		Store.dispatch(boardActions.clickPuzzle((Math.random() * l) | 0));
		Store.dispatch(boardActions.clickPuzzle((Math.random() * l) | 0));
		Store.dispatch(boardActions.checkBoard());

		StateB = new InitialStateConstructor($localStorage, $location);

		expect(Store.getState().board).to.deep.equal(StateB.getInitialState().board);
	}));
});
