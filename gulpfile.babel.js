import gulp from 'gulp';
import removeEmptyLines from 'gulp-remove-empty-lines';

gulp.task('remove-empty-lines', () => {
  gulp.src('./emma.css')
  .pipe(removeEmptyLines())
  .pipe(gulp.dest('./'));
});

