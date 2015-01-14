const SASS_DIR = './public/assets/scss/*.scss',
      TEMPLATES_DIR = './public/templates/*.html';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver');
  // livereload = require('gulp-livereload');

gulp.task('sass', function () {
  gulp.src(SASS_DIR)
    .pipe(sass())
    .pipe(gulp.dest('./public/assets/css'));
    // .pipe(livereload());
});

gulp.task('webserver', function() {
  gulp.src('.').pipe(webserver({
    // root: 'index.js',
    port: 3000,
    livereload: true
  }));
});

gulp.task('templates', function () {
  gulp.src(TEMPLATES_DIR);
});

gulp.task('watch', ['webserver'], function () {
  gulp.watch(TEMPLATES_DIR, ['templates']);
});

// gulp.task('templates', function () {
//   gulp.src(TEMPLATES_DIR).pipe(livereload());
// });
//
// gulp.task('serve', function () {
//   require('./index.js');
// });
//
// gulp.task('watch', ['serve'], function () {
//   livereload.listen();
//   gulp.watch(TEMPLATES_DIR, ['templates']);
//   gulp.watch(SASS_DIR, ['sass']);
// });
