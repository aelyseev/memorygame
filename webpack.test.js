/**
 * @author aelyseev
 * @date 12/02/16
 */

var assign = require('object-assign');

module.exports = function (config) {
	'use strict';

	return assign({}, config, {
		devtool: 'inline-source-map'
	});
};
