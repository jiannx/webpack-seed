// gulp用于webpack打包完成后，拷贝到服务器文件夹

var gulp = require('gulp');
var path = require('path');
var dirs = require('./webpack-config/base.js');
var del = require('del');


gulp.task('clean:server', function() {
    return del(dirs.serverStaticDir, { force: true });
});

gulp.task('push', ['clean:server'], function() {
    gulp.src([path.join(dirs.buildDir, '**/*')])
        .pipe(gulp.dest(dirs.serverStaticDir));
});

gulp.task('watch', ['push'], function() {
    gulp.watch(path.join(dirs.buildDir, '**/*'), ['push']);
});
