var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var dirs = {
  bower: 'bower_components',
  css: 'assets/css',
  js: 'assets/js',
  images: 'assets/images',
  icons: 'assets/icons'
}
gulp.task('sass:dev', function () {
  gulp.src(dirs.css + '/*.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest(dirs.css));
});
gulp.task('default', function() {
  // place code for your default task here
});
