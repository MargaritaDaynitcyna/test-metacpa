const { src, dest, series, watch } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCss = require('gulp-clean-css')
const imageMin = require('gulp-imagemin')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
    return del('dist')
}

const fonts = () => {
    return src('src/fonts/**')
        .pipe(dest('dist/fonts'))
}

const styles = () => {
    return src('src/styles/styles.css')
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const imageMinify = () => {
    return src([
            'src/images/*.jpg',
            'src/images/*.jpeg',
            'src/images/*.png',
            'src/images/*.webp',
        ])
        .pipe(imageMin())
        .pipe(dest('dist/images'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}
watch('src/index.html', htmlMinify)
watch('src/styles/styles.css', styles)
watch([
    'src/images/*.jpg',
    'src/images/*.jpeg',
    'src/images/*.png',
    'src/images/*.webp',
], imageMinify)

exports.default= series(clean, htmlMinify, fonts, styles, imageMinify, watchFiles)
