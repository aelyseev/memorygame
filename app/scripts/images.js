/**
 * Image icons module generator
 * @author aelyseev
 * @date 17/12/15
 */

/* eslint-disable */
var fs = require('fs');
var path = require('path');
var tmpl = require('handlebars').compile('require(\'./{{name}}\')');
var filetmpl = require('handlebars')
	.compile('/* eslint-disable  */\nmodule.exports = {\npattern: {{{pattern}}},\n icons: [{{{icons}}}\n]\n};\n');

var icons = fs.readdirSync(path.join(__dirname, '../images/icons')).filter(function (filename) {
	return /\.svg/.test(filename);
})
	.map(function (filename) {
		return tmpl({name: 'icons/' + filename})
	});

var pattern = tmpl({name: 'pattern.svg'});

fs.writeFileSync(path.join(__dirname,  '../images/index.js'),
	filetmpl({pattern: pattern, icons: icons.join(',\n')}));
