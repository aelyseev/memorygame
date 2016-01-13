/*eslint-disable*/

var webpack = require('webpack');

module.exports = function (config) {
	config.set({

		browsers: ['PhantomJS'],

		singleRun: true,

		frameworks: ['mocha', 'chai'],

		plugins: [
			'karma-chai',
			'karma-mocha',
			'karma-webpack',
			'karma-phantomjs-launcher',
			'karma-sourcemap-loader'
		],

		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/ngstorage/ngStorage.js',
			'./app/js/test.index.js'
		],

		preprocessors: {
			'./app/js/test.index.js': ['webpack', 'sourcemap']
		},

		reporters: ['progress'],

		webpack: require('./webpack.make')({TEST: true}),

		webpackServer: {
			noInfo: true
		}
	});
};
