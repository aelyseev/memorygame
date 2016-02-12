/**
 * @author aelyseev
 * @date 12/1/16
 */

/*global __dirname*/

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var generateIcons = require('./app/scripts/icons');
var assign = require('object-assign');

var appPackage = require('./package.json');

module.exports = function (options) {
	'use strict';

	var PROD = (options && options.PROD) || false;
	var TEST = (options && options.TEST) || false;

	var config = {
		resolve: {
			extensions: ['', '.js']
		},

		externals: {
			angular: 'angular',
			Velocity: 'Velocity'
		},

		module: {
			loaders: [
				{
					test: /\.styl$/,
					include: path.join(__dirname, 'app/styl'),
					loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus?resolve-url')
				},
				{
					test: /\.styl$/,
					include: path.join(__dirname, 'app/images'),
					loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]-[hash:base64:6]!postcss!stylus?resolve-url')
				},
				{
					test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
					loader: 'url?limit=2000&name=[path][name].[ext]'
				},
				{
					test: /\.html$/,
					loader: 'ngtemplate?relativeTo=' + __dirname + '!html?minimize=true'
				}
			],

			noParse: /angular\/angular/
		},

		postcss: function () {
			return [autoprefixer({browsers: ['> 5%', 'IE > 9'], cascade: false})];
		},

		plugins: [
			new webpack.ProvidePlugin({
				'angular': 'angular',
				'velocity': 'Velocity',
				'app': __dirname + '/app/js/app'
			}),

			new webpack.DefinePlugin({
				DEBUG: !PROD,
				VERSION: JSON.stringify(appPackage.version)
			}),

			new ExtractTextPlugin('[name].css', {allChunks: true})
		]
	};

	if (TEST && PROD) {
		throw new Error('Running compilations with in TEST and PROD modes at the same time is incorrect');
	}

	if (TEST) {
		config = require('./webpack.test')(config);
	} else {
		// dev build
		config = require('./webpack.dev')(config);

		// production build
		if (PROD) {
			config.plugins.push(
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false,
						drop_console: true,
						unsafe: true
					}
				})
			);
		}
	}

	generateIcons();

	return config;
};
