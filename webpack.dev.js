/**
 * @author aelyseev
 * @date 12/02/16
 */

/* global __dirname */

var assign = require('object-assign');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var Clean = require('clean-webpack-plugin');

module.exports = function (data) {
	'use strict';

	var config = assign({}, data, {
		context: __dirname + '/app',

		entry: {
			main: './js/app'
		},
		output: {
			path: __dirname + '/public',
			publicPath: '',
			filename: '[name].js'
		},

		devtool: 'source-map',

		devServer: {
			host: 'localhost',
			port: 8080,
			hot: true,
			contentBase: __dirname + '/public'
		}
	});

	config.plugins.push(
		new Clean(['public']),
		new CopyWebpackPlugin([
			{from: '../node_modules/angular/angular.js'},
			{from: '../node_modules/angular-route/angular-route.js'},
			{from: '../node_modules/ngstorage/ngstorage.js'},
			{from: '../node_modules/velocity-animate/velocity.js'},
			{from: './index.html'}
		])
	);
	return config;
};
