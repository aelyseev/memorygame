/**
 * @author aelyseev
 * @date 21/01/16
 */

var puzzleStyles = require('../../../images/icons2.styl');
var puzzleStyleNames = require('../../../images/icons2');

var generatePuzzles = function generator(styles, styleNames, boardSize, startId) {
	'use strict';

	var i;
	var puzzles = [];
	var pair;
	var iconName;
	var puzzle;

	var id = startId;

	var icons = styleNames.slice(0);

	var puzzleIds = Array.apply(null, new Array(boardSize * boardSize)).map(function (v, j) {
		return j;
	});

	var random = function (ceil) {
		return Math.floor(Math.random() * ceil);
	};

	for (i = 0; i < (boardSize * boardSize / 2); i++) {
		iconName = icons.splice(random(icons.length), 1)[0];
		pair = [
			puzzleIds.splice(random(puzzleIds.length), 1)[0],
			puzzleIds.splice(random(puzzleIds.length), 1)[0]
		];

		puzzle = {
			solved: false,
			clicks: 0,
			rotate: 180,
			classname: styles[iconName],
			open: false
		};

		puzzles.push(
			angular.extend({index: pair[0], pair: pair[1]}, puzzle, {id: id++}),
			angular.extend({index: pair[1], pair: pair[0]}, puzzle, {id: id++})
		);
	}
	return puzzles.slice(0).sort(function (a, b) {
		return a.index - b.index;
	});
};

module.exports = angular.bind(this, generatePuzzles, puzzleStyles, puzzleStyleNames);
