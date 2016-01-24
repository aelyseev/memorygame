/**
 * @author aelyseev
 * @date 24/01/16
 */

var generatePuzzles = require('./generate-puzzles');
var diff = require('lodash/difference');
var findIndex = require('lodash/findIndex');
var bind = require('lodash/bind');

describe('Module: Generate puzzles', function () {
	'use strict';

	it('Verify that all puzzle ids are unique and covers a range', function () {
		var boardSize = 6;
		var lastId = 1;
		var puzzles = generatePuzzles(boardSize, lastId).map(function (puzzle) {
			return puzzle.id;
		});
		var ids = Array.apply(null, new Array(boardSize * boardSize)).map(function (v, i) {
			return i + 1;
		});

		expect(diff(puzzles, ids)).to.deep.equal([]);
		expect(diff(ids, puzzles)).to.deep.equal([]);
	});

	it('Verify that all pairs has a pair', function () {
		var boardSize = 8;
		var lastId = 233;
		var puzzles = generatePuzzles(boardSize, lastId);
		var p1;
		var p2;
		var filter = function (p, v) {
			return p.pair === v.index;
		};

		while (puzzles.length > 0) {
			p1 = puzzles.shift();
			p2 = puzzles.splice(findIndex(puzzles, bind(filter, null, p1)), 1)[0];
			expect(p1.index).to.equal(p2.pair);
			expect(p1.pair).to.equal(p2.index);
		}
	});
});
