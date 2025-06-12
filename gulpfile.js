const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

function styles() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(concat('theme.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets'));
}

function scripts() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('theme.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets'));
}

function watch() {
    gulp.watch('src/styles/**/*.scss', styles);
    gulp.watch('src/scripts/**/*.js', scripts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = gulp.series(styles, scripts);
