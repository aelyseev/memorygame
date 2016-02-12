/**
 * @author aelyseev
 * @date 12/02/16
 */

var optionsDefault = [
	{name: '4×4', active: false},
	{name: '6×6', active: true},
	{name: '8×8', active: false}
];

module.exports = {
	route: '/',
	board: {
		dirty: false,
		options: optionsDefault,
		queue: [],
		solved: false,
		lastId: 1,
		clicks: 0,
		puzzles: []
	}
};
