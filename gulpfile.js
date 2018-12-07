
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('fancy-log');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
})

gulp.task('dev', ['html', 'assets', 'verdor'], bundle);

gulp.task('watch', ['dev'], function () {
  var watcher = gulp.watch('src/**/*.ts', bundle);
  watcher.on('change', function(event) {
    log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

function bundle() {
  return browserify('src/app.ts')
    .plugin('tsify', {
      noImplicitAny: true
    })
    .external(['d3'])
    .bundle()
    // 如果有错误发生，记录这些错误
    .on('error', err => log('browserify', err))
    .pipe(source('bundle.js'))
    .pipe(buffer()) // 缓存
    // 可选项，如果你不需要 sourcemaps，就删除
    // .pipe(sourcemaps.init({ loadMaps: true })) 
    // 从 browserify 文件载入 map
    // 在这里将变换操作加入管道
    // .pipe(sourcemaps.write('./')) // 写入 .map 文件
    .pipe(gulp.dest('./dist'))
    .on('end', () => log('bundle end.'));
}

gulp.task('verdor', function () {
  return browserify()
    .require('d3/dist/d3.min.js', {expose: 'd3'})
    .bundle()
    .on('error', err => log('browserify', err))
    .pipe(source('verdor.js'))
    .pipe(gulp.dest('./dist'))
    .on('end', () => log('bundle verdor end.'));
});

gulp.task('admin', ['html'], function () {
  return browserify('src/admin.ts')
    .plugin('tsify', {
      noImplicitAny: true
    })
    .bundle()
    // 如果有错误发生，记录这些错误
    .on('error', err => log('browserify', err))
    .pipe(source('admin.js'))
    .pipe(buffer()) // 缓存
    .pipe(gulp.dest('./dist'))
    .on('end', () => log('bundle admin end.'));
})