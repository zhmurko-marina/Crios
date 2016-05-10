var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

var paths = {
    styles: {
        src: 'sass',
        files: 'sass/*.sass',
        dest: 'css'
    }
};

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ''
    }
  })
});

gulp.task('sass', function (){
    gulp.src(paths.styles.files)
	.pipe(sass())
    .pipe(cleanCSS())
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .pipe(gulp.dest(paths.styles.dest))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('minify', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''))
});

gulp.task('default', ['browserSync','sass'], function() {
    gulp.watch(paths.styles.files, ['sass']);
    gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});



