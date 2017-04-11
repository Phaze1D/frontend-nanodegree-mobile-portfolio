var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");




gulp.task('js', function() {
    return gulp.src('src/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
        .pipe(cleanCSS())
        // .pipe(gzip({ append: false }))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('dist'));
})

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
          .pipe(clean());
});

gulp.task('png', function () {
    return gulp.src('src/**/*.png')
          .pipe(gulp.dest('dist'));
});

gulp.task('jpg', function () {
    return gulp.src('src/**/*.jpg')
          .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
  runSequence('clean', 'html', 'js', 'css', 'png', 'jpg', callback);
});
