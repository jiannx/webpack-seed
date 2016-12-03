// gulp用于webpack打包完成后，拷贝到服务器文件夹

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var path = require('path');
var dirs = require('./webpack-config/base.js');

var pushDir = path.resolve(dirs.rootDir, '../test');

gulp.task('push', function() {
    gulp.src([
            path.join(dirs.buildDir, '**/*'),
        ])
        .pipe(plumber())
        .pipe(gulp.dest(pushDir));
});

gulp.task('watch', ['push'], function() {
    gulp.watch(path.join(dirs.buildDir, '**/*'), ['push']);
});
