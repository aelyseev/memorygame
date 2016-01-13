/**
 * @author aelyseev
 * @date 12/1/16
 */

/*global __dirname*/

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var generateIcons = require('./app/scripts/images');
var assign = require('object-assign');

module.exports = function (options) {
	'use strict';

	var BUILD = !!options.BUILD || false;
	var PROD = (!!options.PROD && BUILD) || false;
	var TEST = !!options.TEST || !BUILD;

	var config = {
		resolve: {
			extensions: ['', '.js']
		},

		externals: {
			angular: 'angular'
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
					loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:6]!postcss!stylus?resolve-url|')
				},
				{
					test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
					loader: 'url?limit=2000&name=[path][name].[ext]'
				},
				{
					test: /tmpl\.html$/,
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
				'app': __dirname + '/app/js/app'
			}),

			new ExtractTextPlugin('[name].css', {allChunks: true, disable: TEST})
		]
	};

	if (BUILD) { //build
		config = assign({}, config, {
			context: __dirname + '/app',

			entry: {
				main: './main'
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
			new CopyWebpackPlugin([
				{from: '../node_modules/angular/angular.js'},
				{from: '../node_modules/angular-route/angular-route.js'},
				{from: '../node_modules/ngstorage/ngstorage.js'},
				{from: './index.html'}
			])
		);

		if (PROD) { //build and prod
			config.plugins.push(
				new Clean(['public']),
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false,
						drop_console: true,
						unsafe: true
					}
				})
			);
		}
	} else {  // only test may be in this case
		config = assign({}, config, {
			devtool: 'inline-source-map'
		});
		config.plugins.push(
			new webpack.ProvidePlugin({
				'angular': 'angular',
				'app': __dirname + '/app/js/app'
			})
		);
	}

	generateIcons();

	return config;
};
