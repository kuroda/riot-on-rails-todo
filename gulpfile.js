var del = require('del');
var gulp = require('gulp');
var riot = require('gulp-riot');
var watch = require('gulp-watch');

var srcDir = './app/assets/riot-tags/';
var destDir = './app/assets/javascripts/riot/';

var compileRiot = function() {
  gulp.src(srcDir + '**/*.tag')
    .pipe(riot())
    .pipe(gulp.dest(destDir));
}

gulp.task('riot', function() {
  del(destDir + '**/*.js');
  compileRiot();
});

gulp.task('watch', function() {
  watch(srcDir + '**/*.tag', function(file) {
    if (file.event == 'unlink') {
      del(destDir + file.path.slice(srcDir.length - 2).replace(/\.tag$/, '.js'))
    }
    else {
      compileRiot();
    }
  });
});

gulp.task('default', ['riot']);
