const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpJade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('jade', function() {
    return gulp.src('app/jade/**/*.jade')
        .pipe(gulpJade({
            pretty: true
        }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/js/*.js',
    ])
        .pipe(gulp.dest('dist/js'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function() {
    return gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', async function() {
    return del.sync('dist');
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([
        'app/css/**/*'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildImg = gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/jade/**/*.jade', gulp.parallel('jade'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/scripts/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('jade', 'css-libs', 'sass', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass', 'scripts'));
