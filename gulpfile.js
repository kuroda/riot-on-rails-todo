var gulp = require('gulp');
var riot = require('gulp-riot');

gulp.task('riot', function(){
  gulp.src('./app/assets/riot-tags/*.tag')
    .pipe(riot())
    .pipe(gulp.dest('./app/assets/javascripts/riot/'));
});

gulp.task('watch', function(){
  gulp.watch('./app/assets/riot-tags/*.tag', ['riot']);
});

gulp.task('default', ['riot']);
