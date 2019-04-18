const gulp = require('gulp');
const rollup = require('rollup');
const log = require('fancy-log');
const rollupTypescript = require('rollup-plugin-typescript');

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('verdor', function () {
  return gulp.src('node_modules/d3/dist/d3.min.js')
    .pipe(gulp.dest('dist'));
});

const inputOptions = {
  input: './src/app.ts',
  plugins: [
    rollupTypescript()
  ],
  external: ['d3']
}

const outputOptions = {
  format: 'umd',
  file: './dist/bundle.js',
  paths: { d3: '/d3.min.js' },
  globals: { d3: 'd3' },
  sourcemap: true
}

gulp.task('bundle', async function () {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
});

gulp.task('build', gulp.series('html', 'assets', 'verdor', 'bundle'));

gulp.task('rollup-watch', function () {
  const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
    watch: {
      include: 'src/**'
    }
  }
  const watcher = rollup.watch(watchOptions);
  watcher.on('event', event => {
    log(event.code);
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误
  });
});

gulp.task('watch', gulp.series('build', 'rollup-watch'));


// admin部分
const adminIn = {
  input: './src/admin.ts',
  plugins: [
    rollupTypescript()
  ]
}

const adminOut = {
  format: 'umd',
  file: './dist/admin.js',
  sourcemap: true
}

gulp.task('admin', async function () {
  const bundle = await rollup.rollup(adminIn);
  await bundle.write(adminOut);
});