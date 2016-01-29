/**
 * @author aelyseev
 * @date 27/01/16
 */

var redux = require('redux');

module.exports = redux.combineReducers({
	board: require('./board-reducer'),
	route: require('./route')
});
