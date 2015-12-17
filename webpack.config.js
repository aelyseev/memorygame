/**
 * @author aelyseev
 * @date 14/12/15
 */

/* eslint-disable */

var DEV = 'dev';
var PROD = 'prod';

var autoprefixer = require('autoprefixer');

var mode = process.env.NODE_ENV || DEV;

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname + '/app',
	entry: {
		main: './main'
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
				loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus?resolve-url')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:6]')
			},
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				loader: 'file?name=[path][name].[ext]'
			},
			{
				test: /\.html$/,
				include: /tmpl/,
				loader: 'html?minimize=true'
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
			{from: (mode === DEV) ? '../node_modules/angular/angular.js' : '../node_modules/angular/angular.min.js'},
			{from: (mode === DEV) ? '../node_modules/angular-route/angular-route.js' :
				'../node_modules/angular-route/angular-route.min.js'}
		])
		//new webpack.HotModuleReplacementPlugin()
	],

	devtool: 'source-map',

	devServer: {
		host: 'localhost',
		port: 8080,
		hot: true,
		contentBase: __dirname + '/public'
	}
};
