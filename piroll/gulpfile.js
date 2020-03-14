const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()

function style() {
    return gulp.src('./scss/**/*.scss')
            .pipe(sass())
            .pipe(rename({basename: 'style'}))
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;