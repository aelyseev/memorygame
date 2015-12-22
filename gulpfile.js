/*eslint-disable*/

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var ghpages = require('gulp-gh-pages');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var ignore = require('gulp-ignore');
var del = require('del');

gulp.task('clean', function () {
	return del(['public']);
});

gulp.task("webpack", ['clean'], function(callback) {
	// force production build mode
	process.env.NODE_ENV = 'prod';
	webpack(require('./webpack.config'), function(err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack", err);
		}
		gutil.log("[webpack]", stats.toString());
		callback();
	});
});

gulp.task('build', ['webpack'], function () {
	return gulp.src('./public/index.html')
		.pipe(usemin({
			js: [uglify, rev],
			js2: [rev]
		}))
		.pipe(gulp.dest('./public'));
});


gulp.task('deploy', ['build'],function () {
	return gulp.src('public/**/*')
		.pipe(ignore('angular*'))
		.pipe(ignore('ngstorage*'))
		.pipe(ignore('main.js'))
		.pipe(ghpages());
});
