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
var imagemin = require('gulp-imagemin');


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

gulp.task('pizzeria-large', function() {
  return gulp.src("src/views/images/pizzeria.jpg")
  .pipe(imageResize({
    width: 1440,
    quality: 0.3,
    imageMagick: true
  }))
  .pipe(imagemin())
  .pipe(rename(function (path) { path.basename += "-large"; }))
  .pipe(gulp.dest('dist/views/images'));
})

gulp.task('pizzeria-medium', function() {
  return gulp.src("src/views/images/pizzeria.jpg")
  .pipe(imageResize({
    width: 720,
    quality: 0.7,
    imageMagick: true
  }))
  .pipe(imagemin())
  .pipe(rename(function (path) { path.basename += "-medium"; }))
  .pipe(gulp.dest('dist/views/images'));
})


gulp.task('pizzeria-small', function() {
  return gulp.src("src/views/images/pizzeria.jpg")
  .pipe(imageResize({
    width: 320,
    quality: 0.6,
    imageMagick: true
  }))
  .pipe(imagemin())
  .pipe(rename(function (path) { path.basename += "-small"; }))
  .pipe(gulp.dest('dist/views/images'));
})

gulp.task('pizzeria-xsmall', function() {
  return gulp.src("src/views/images/pizzeria.jpg")
  .pipe(imageResize({
    width: 100,
    quality: 0.7,
    imageMagick: true
  }))
  .pipe(imagemin())
  .pipe(rename(function (path) { path.basename += "-xsmall"; }))
  .pipe(gulp.dest('dist/views/images'));
})

gulp.task('build', function(callback) {
  runSequence('clean', 'html', 'js', 'css', 'png', 'jpg', 'pizzeria-large', 'pizzeria-medium', 'pizzeria-xsmall', 'pizzeria-small', callback);
});
