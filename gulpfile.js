/*eslint-disable*/

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var ghpages = require('gulp-gh-pages');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

gulp.task("webpack", function(callback) {
	// run webpack
	webpack(require('./webpack.config'), function(err, stats) {
		if(err) {
			throw new gutil.PluginError("webpack", err);
		}
		gutil.log("[webpack]", stats.toString());
		callback();
	});
});

gulp.task('build', ['webpack'], function () {
	gulp.src('./public/index.html')
		.pipe(usemin({
			js: [uglify, rev]
		}))
		.pipe(gulp.dest('./public'))
});

