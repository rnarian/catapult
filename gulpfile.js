'use strict';

var pngquant = require('imagemin-pngquant');
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var dirs = {
  bower: 'bower_components',
  css: 'assets/css',
  js: 'assets/js',
  images: 'assets/images',
  icons: 'assets/icons'
}

var autoprefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('sass:dev', function () {
  gulp.src(dirs.css + '/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer(autoprefixerOptions))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(dirs.css));
});

gulp.task('sass', function () {
  gulp.src(dirs.css + '/*.scss')
    .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(dirs.css));
});

gulp.task('imagemin', function () {
  gulp.src(dirs.images + '/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dirs.images));
});

gulp.task('js', function () {
  gulp.src([dirs.bower + '/modernizr/modernizr.js'])
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dirs.js + '/'));

  gulp.src([
    dirs.bower + '/jquery/dist/jquery.js',
    dirs.js + '/*.js',
    '!' + dirs.js + '/modernizr.js',
    '!' + dirs.js + '/build.js'
  ])
    .pipe(plugins.concat('build.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dirs.js + '/'));
});

gulp.task('default', function() {
  // place code for your default task here
});
