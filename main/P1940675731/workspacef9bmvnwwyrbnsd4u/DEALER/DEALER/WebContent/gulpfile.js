var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

var ui5preload = require('gulp-ui5-preload');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

gulp.task(
  'ui5preload', 
  function(){
    return gulp.src(
      [
        './view/*.js',
        './view/accounts/*.js',
        './view/orders/*.js',
        './view/payments/*.js',
        './view/products/*.js',
        './util/*.js',
        './*.js',
        '!Component-preload.js',
        '!gulpfile.js'
        
      ]
    )
    .pipe(gulpif('**/*.js',uglify()))    //only pass .js files to uglify
    .pipe(ui5preload({base:'.',namespace:'com.vikalp.dealermgmt'}))
    .pipe(gulp.dest('.'));
  }
)