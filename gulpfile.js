var del = require('del');
var gulp = require('gulp');
var riot = require('gulp-riot');
var watch = require('gulp-watch');

var compileRiot = function() {
  gulp.src('./app/assets/riot-tags/**/*.tag')
    .pipe(riot())
    .pipe(gulp.dest('./app/assets/javascripts/riot/'));
}

gulp.task('riot', compileRiot);

gulp.task('watch', function() {
  watch('./app/assets/riot-tags/**/*.tag', function(file) {
    if (file.event == 'unlink') {
      path = './app/assets/javascripts/riot/' +
        file.path.slice(21).replace(/\.tag$/, '.js')
      del([path], function(err, paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'))
      });
    }
    else {
      compileRiot();
    }
  });
});

gulp.task('default', ['riot']);
