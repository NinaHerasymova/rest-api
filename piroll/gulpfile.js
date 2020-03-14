const gulp = require('gulp')
const sass = require('gulp-sass')
const sassImport = require('gulp-sass-import')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()

function style() {
    return gulp.src('./src/scss/main.scss')
            .pipe(sassImport({
                filename: 'main'
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({basename: 'style'}))
            .pipe(gulp.dest('./src/css'))
            .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./src/scss/**/*.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;