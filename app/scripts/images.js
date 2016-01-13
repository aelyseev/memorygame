/**
 * Image icons module generator
 * @author aelyseev
 * @date 17/12/15
 */

/* eslint-disable */
var fs = require('fs');
var path = require('path');
var tmpl = require('handlebars').compile(fs.readFileSync(__dirname + '/icons.styl.tmpl', 'utf8'));

module.exports = function () {
	var icons = fs.readdirSync(path.join(__dirname, '../images/icons')).filter(function (filename) {
			return /\.svg/.test(filename);
		})
		.map(function (filename, id) {
			return {style: 'icon' + id, file: filename};
		});

	fs.writeFileSync(path.join(__dirname,  '../images/icons.styl'), tmpl({icons: icons}));

	fs.writeFileSync(path.join(__dirname,  '../images/icons.js'),
		'/* eslint-disable  */\nmodule.exports = [\n' +
		icons.map(function (v) {return JSON.stringify(v.style); }).join(', \n') + '\n];\n');
};

