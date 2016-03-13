var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith');

var apppath = 'app',
    paths = {
    src: {
        dev:'dev/**/*.*',
        jade:'dev/jade/*.jade',
        scss:'dev/scss/style.scss',
        sprites: 'dev/sprites/*.png',
        sprites_social: 'dev/sprites_social/*.png',
        js: 'dev/js/**/*.*',
        fonts: 'dev/fonts/**/*.*',
        images: 'dev/images/**/*.*',
        cors: 'dev/cors/**/*.*',
        server: 'dev/server/**/*.*',
        htaccess: 'dev/.htaccess',
        favicon: 'dev/favicon.ico'
    },
    dest:{
        app:apppath + '/',
        jade:apppath + '/',
        scss:apppath + '/css/',
        sprites: apppath + '/images/sprite',
        sprites_social: apppath + '/images/sprites_social',
        js: apppath + '/js',
        fonts: apppath + '/fonts',
        images: apppath + '/images',
        cors: apppath + '/cors',
        server: apppath + '/server'
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
gulp.task('sprites_social', function () {
    var spriteData = gulp.src(paths.src. sprites_social)
        .pipe(spritesmith({
                imgName: '../images/sprites_social.png',
                cssName: 'sprites_social.css',
                algorithm: "top-down",
                padding:30

        }));
    spriteData.img.pipe(gulp.dest(paths.dest.sprites_social));
    spriteData.css.pipe(gulp.dest(paths.dest.scss));
});

// -------------------Js---------------------------
gulp.task('js', function() {
  gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.dest.js));
});

//--------------------Шрифты----------------------
gulp.task('fonts', function() {
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dest.fonts))
});

//--------------------Картинки----------------------
gulp.task('images', function () {
  gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dest.images));
});

gulp.task('watch',function () {
    gulp.watch(paths.src.dev,['default']);
});

// копирование нужных файлов
gulp.task('copy',function () {
    gulp.src(paths.src.cors)
        .pipe(gulp.dest(paths.dest.cors));
    gulp.src(paths.src.server)
        .pipe(gulp.dest(paths.dest.server));
    gulp.src(paths.src.htaccess)
        .pipe(gulp.dest(paths.dest.app));
    gulp.src(paths.src.favicon)
        .pipe(gulp.dest(paths.dest.app));
});

gulp.task('default',['jade', 'sass', 'sprite', 'sprites_social', 'fonts', 'js', 'images', 'copy']);
