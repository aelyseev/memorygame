/**
 * @author aelyseev
 * @date 14/12/15
 */

/* eslint-disable */

var DEV = 'dev';
var PROD = 'prod';

var mode = process.env.NODE_ENV || DEV;

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// generate icon styles
require('./app/scripts/images');

module.exports = {
	context: __dirname + '/app',
	entry: {
		main: './main'
	},
	output: {
		path: __dirname + '/public',
		publicPath: '',
		filename: '[name].js'
	},

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
				loader: 'file?name=[path][name].[ext]'
			},
			{
				test: /tmpl\.html$/,
				loader: 'ngtemplate?relativeTo=' + __dirname +'!html?minimize=true'
			}
		],

		noParse: /angular\/angular/
	},

	postcss: function () {
		return [autoprefixer({browsers: ['> 5%', 'IE > 9'], cascade: false})]
	},

	plugins: [
		new ExtractTextPlugin('[name].css', {allChunks: true}),
		new CopyWebpackPlugin([
			{from: '../node_modules/angular/angular.js'},
			{from: '../node_modules/angular-route/angular-route.js'},
			{from: '../node_modules/ngstorage/ngstorage.js'},
			{from: './index.html'}
		])
	],

	devtool: 'source-map',

	devServer: {
		host: 'localhost',
		port: 8080,
		hot: true,
		contentBase: __dirname + '/public'
	}
};

if (mode === PROD) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
}
