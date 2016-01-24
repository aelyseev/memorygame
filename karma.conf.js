/*eslint-disable*/

var webpack = require('webpack');

module.exports = function (config) {
	config.set({

		browsers: ['PhantomJS'],

		singleRun: false,

		frameworks: ['mocha', 'sinon-chai'],

		plugins: [
			'karma-sinon-chai',
			'karma-mocha',
			'karma-webpack',
			'karma-phantomjs-launcher',
			'karma-sourcemap-loader',
			'karma-spec-reporter',
			'karma-coverage'
		],

		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/ngstorage/ngStorage.js',
			'node_modules/velocity-animate/velocity.js',
			'./app/js/test.index.js'
		],

		preprocessors: {
			'./app/js/test.index.js': ['webpack', 'sourcemap']
		},

		reporters: [
			'spec',
			'coverage'
		],

		autoWatch: true,

		webpack: require('./webpack.make')({TEST: true}),

		webpackServer: {
			noInfo: true
		}
	});
};
