const gulp = require('gulp');
const browserSync = require('browser-sync');
const eslit = require('gulp-eslit');
const data = require('./data/stories.js')

const server = browserSync.create();

function eslitHtml(){
  console.log(data)
  return gulp.src('./src/*.html')
      .pipe(eslit(data.default))
      .pipe(gulp.dest('public/'))
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './public/'
    },
    open: false
  });
  done();
}

const watch = () => gulp.watch('src/*.html', gulp.series(eslitHtml, reload));

exports.default = gulp.series(eslitHtml, serve, watch);