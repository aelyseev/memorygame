/**
 * Image icons module generator
 * @author aelyseev
 * @date 17/12/15
 */

/* eslint-disable */
var fs = require('fs');
var path = require('path');
var tmpl = require('handlebars').compile('require(\'./{{name}}\')');
var icons = fs.readdirSync(path.join(__dirname, '../images/icons')).filter(function (filename) {
	return /\.svg/.test(filename);
})
	.map(function (filename) {
		return tmpl({name: filename})
	});

fs.writeFileSync(path.join(__dirname,  '../images/icons/index.js'),
	'/* eslint-disable  */\nmodule.exports = [\n' + icons.join(', \n') + '\n];\n');
