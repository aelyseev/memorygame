/**
 * Generate image names
 * @author aelyseev
 * @date 17/12/15
 */

/* eslint-disable */

var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');

var tmpl = Handlebars.compile(fs.readFileSync(__dirname + '/css.tmpl', 'utf-8'));

var icons = fs.readdirSync(path.join(__dirname, '../images/icons')).filter(function (filename) {
	return /\.svg/.test(filename);
});

fs.writeFileSync(path.join(__dirname,  '../images/icons.css'), tmpl({files: icons}));
