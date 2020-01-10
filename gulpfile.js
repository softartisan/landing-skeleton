const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browsersync = require('browser-sync');

const files = {
  jsPath: 'src/js/*.js',
  scssPath: 'src/scss/*.scss'
}

const scssTask = () => {
  return gulp.src(files.scssPath)
    .pipe(sass())
    .pipe(cssnano()) 
    .pipe(gulp.dest('public'));
}

const jsTask = () => {
  return gulp.src([files.jsPath])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
}

const watchTask = () => {
  gulp.watch(
    [files.scssPath, files.jsPath],
    gulp.parallel(scssTask, jsTask)
  );
  gulp.watch(
    ['public/**/*', 'src/**/*'],
    browserSyncReload
  );
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "public",
      routes: {
        '/': 'public/index.html',
      }
    },
    port: 9000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

exports.default = gulp.series(gulp.parallel(scssTask, jsTask), browserSync, watchTask);