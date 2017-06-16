const assign = require('object-assign');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const path = require('path');
const distPath = path.join(__dirname, 'public');
const publicPath = '/';
const port = 8888;

module.exports = function (data) {
	'use strict';

	var config = assign({}, data, {
		context: __dirname + '/app',

		entry: {
			main: ['./js/app']
		},
		output: {
			path: distPath,
			publicPath,
			filename: '[name].js'
		},

		devtool: 'source-map',

		devServer: {
			host: 'localhost',
			contentBase: distPath,
			publicPath,
			port,
			hot: true
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
