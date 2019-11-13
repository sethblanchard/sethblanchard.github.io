const gulp = require('gulp');
const browserSync = require('browser-sync');

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './src/'
    },
    open: false
  });
  done();
}

const watch = () => gulp.watch('src/*.html', reload);

exports.default = gulp.series(serve, watch);