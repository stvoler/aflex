const gulp = require('gulp');
const jsImport = require('gulp-js-import');

const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const watch = require('gulp-watch');

gulp.task('sass-compile', function () {
  return gulp.src('src/css/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'));
});
 
gulp.task('import', function() {
  return gulp.src('src/js/*.js')
		.pipe(jsImport({hideConsole: true}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('compress-js', function() {
  return gulp.src('src/js/*.js')
		.pipe(minify({
			ext:{
					src: '-debug.js',
					min:'.js'
			},
		}))
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('fonts', function() {
	return gulp.src(['src/fonts/*.*'])
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('images', function() {
	return gulp.src(['src/img/*.*'])
		.pipe(gulp.dest('dist/img/'));
});

gulp.task('videos', function() {
	return gulp.src(['src/video/*.*'])
		.pipe(gulp.dest('dist/video/'));
});

gulp.task('watch', function () {
  gulp.watch('src/css/*.scss', gulp.series('sass-compile'));
	gulp.watch('src/**/*.html', njk);
	// gulp.watch('dist/*.html', gulp.series('html'));
	gulp.watch('src/js/*.js', gulp.series('compress-js')); 
});

function njk(){
	return gulp.src('src/*.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('dist'))
};

exports.default = gulp.series(njk, 'fonts', 'images', 'videos', 'sass-compile', 'compress-js', 'import', 'watch');
