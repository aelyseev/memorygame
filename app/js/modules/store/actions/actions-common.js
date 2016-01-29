/**
 * @author aelyseev
 * @date 22/01/16
 */

var actions = require('./index');

module.exports = {
	build: function (name) {
		'use strict';
		return {type: name};
	},

	nothing: function () {
		'use strict';
		return this.build(actions.NOTHING);
	}
};
