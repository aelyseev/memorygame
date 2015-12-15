/**
 * @author aelyseev
 * @date 14/12/15
 */

var DEV = 'dev';
var PROD = 'prod';

var mode = process.env.NODE_ENV || DEV;

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname + '/app',
	entry: {
		app: './app'
	},
	output: {
		path: __dirname + '/public',
		publicPath: '/',
		filename: '[name].js'
	},

	resolve: {
		extensions: ['', '.js', '.styl']
	},

	externals: {
		angular: 'angular'
	},

	module: {

		loaders: [
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve-url')
			},
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				loader: 'file?name=[path][name].[ext]'
			}
		],

		noParse: /angular\/angular/
	},

	plugins: [
		new ExtractTextPlugin('[name].css', {allChunks: true}),
		new CopyWebpackPlugin([
			{from: '../node_modules/angular/angular.min.js'},
			{from: '../node_modules/angular/angular.js'}
		])
		//new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
		host: 'localhost',
		port: 8080,
		hot: true,
		contentBase: __dirname + '/public'
	}
};
