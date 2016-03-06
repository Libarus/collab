var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith');

var paths = {
    src: {
        dev:'dev/**/*.*',
        jade:'dev/jade/*.jade',
        scss:'dev/scss/style.scss',
        sprites: 'dev/sprites/*.png'
    },
    dest:{
        app:'app/',
        jade:'app/',
        scss:'app/css/',
        sprites: 'app/images/sprite'
    }
};

gulp.task('sass',function () {
    gulp.src(paths.src.scss)
        .pipe(sass({"bundleExec": true}))
        .pipe(gulp.dest(paths.dest.scss));
});

gulp.task('jade',function () {
    var YOUR_LOCALS = {};

    gulp.src(paths.src.jade)
        .pipe(jade({
             locals: YOUR_LOCALS
            //,pretty: '    '
        }))
        .pipe(gulp.dest(paths.dest.jade));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.src.sprites)
        .pipe(spritesmith({
                imgName: '../images/sprite.png',
                cssName: 'sprite.css',
                algorithm: "top-down"
        }));
    spriteData.img.pipe(gulp.dest(paths.dest.sprites));
    spriteData.css.pipe(gulp.dest(paths.dest.scss));
});

// -------------------Js---------------------------
gulp.task('js', function() {
  gulp.src('dev/js/*')
    .pipe(gulp.dest('app/js/'))
});

//--------------------Шрифты----------------------
gulp.task('fonts', function() {
  gulp.src('dev/fonts/*')
    .pipe(gulp.dest('app/fonts/'))
});

//Картинки
gulp.task('images', function () {
  return gulp.src('dev/images/**/*')
  .pipe(gulp.dest('app/images'));
});

gulp.task('watch',function () {
    gulp.watch(paths.src.dev,['default']);
});

// копирование нужных файлов
gulp.task('copy',function () {
    gulp.src('dev/cors/**/*.*')
        .pipe(gulp.dest('app/cors'));
    gulp.src('dev/server/**/*.*')
        .pipe(gulp.dest('app/server'));
    gulp.src('dev/.htaccess')
        .pipe(gulp.dest('app'));
});

gulp.task('default',['jade', 'sass', 'sprite', 'fonts', 'js', 'images', 'copy']);
