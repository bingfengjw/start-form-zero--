var gulp = require('gulp'),
    less = require('gulp-less');
 
gulp.task('testLess', function () {
    gulp.src('testLess/less/less.less')		//多个文件以数组形式传入
        .pipe(less())
        .pipe(gulp.dest('testLess/CSS'));	//将会在src/css下生成index.css以及detail.css 
});