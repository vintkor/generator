// Чтобы установить все пакеты и зависимости для скачанного примера, выполните команду npm i в папке проекта.

var gulp        = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglify'), // Подключаем gulp-uglify (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant    = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer= require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
    htmlreplace = require('gulp-html-replace');// Замена "src" в index.html main.js на main.min.js
    var htmlmin = require('gulp-htmlmin');

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.js',
        'app/libs//bootstrap/dist/js/bootstrap.js',
        'app/libs/modernizr.js',
        'app/libs/jquery.maskedinput/dist/jquery.maskedinput.js',
        'app/libs/sweetalert/dist/sweetalert.min.js',
        'app/libs/lity/dist/lity.js',
        'app/libs/wow.js'
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
    // Наблюдение за другими типами файлов
});

// ----------------------Очистка кеша gulp clear ----------------------------

gulp.task('clear', function () {
    return cache.clearAll();
})

// ----------------------Дефолтный таск gulp --------------------------------

gulp.task('default', ['watch']);

// ----------------------Сборка проекта "gulp build"---------------------------

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('scripts-min', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/js/main.js'
        ])
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('default', ['watch']);

gulp.task('build', ['clean', 'img', 'sass', 'scripts-min'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшн
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var minCss = gulp.src('app/css/main.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))


    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшн
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшн
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим все файлы в корне в продакшн
    .pipe(htmlreplace({
            'css': 'css/libs.min.css',
            'css2': 'css/main.min.css',
            'js': 'js/main.min.js'
        }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
    .pipe(gulp.dest('dist'));

    var buildPng = gulp.src('app/*.png')
    .pipe(gulp.dest('dist'));

    var buildIco = gulp.src('app/*.ico')
    .pipe(gulp.dest('dist'));

     var buildJson = gulp.src('app/*.json')
    .pipe(gulp.dest('dist'));

    var buildXml = gulp.src('app/*.xml')
    .pipe(gulp.dest('dist'));
});