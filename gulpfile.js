/*eslint-disable*/

var gulp = require('gulp');
var series = require('run-sequence');
var gutil = require("gulp-util");
var webpack = require('webpack-stream');
var ghpages = require('gulp-gh-pages');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var del = require('del');
var karma = require('karma').Server;
var dist = 'dist';

gulp.task('clean', function () {
	return del([dist]);
});

gulp.task('test', function r(done) {
	new karma({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('webpack', function () {
	return gulp.src('./app/js/app.js')
		.pipe(webpack(require('./webpack.make.js')({ PROD: true })))
		.pipe(gulp.dest(dist))
});

gulp.task('vendor', function () {
	return vendor(`${dist}/index.html`)
		.pipe(gulp.dest(dist));
});

gulp.task('publish', function () {
	return vendor(`${dist}/index.html`)
		.pipe(ghpages());
});

gulp.task('build', function () {
	return series('test', 'clean', 'webpack', 'vendor');
});

gulp.task('deploy', function () {
	return series('test', 'clean', 'webpack', 'publish');
});

function vendor(indexFile) {
	return gulp.src(indexFile)
		.pipe(usemin({
			css: [rev],
			js: [uglify, rev],
			js2: [rev]
		}))
}
