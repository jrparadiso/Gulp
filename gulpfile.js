const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-rimraf');

/*
  -- TOP LEVEL FUNCTIONS
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Point to folder to output
  gulp.watch - Watch files and folders for changes
// 
gulp.task('',  function(){});
*/

// Logs Message
gulp.task('message', () =>
    console.log('Hello Gulp!')
);

// Clean ip dist files
gulp.task('clean',[], function() { 
    console.log('clean all files in the dist directory ');
    gulp
      .src('dist/*', {read:false})
      .pipe(clean());
});


// Copy all HTML files
gulp.task('copyHtml', () => 
    gulp
      .src('src/*.html')
      .pipe(gulp.dest('dist'))
);

// Optimize images
gulp.task('imageMin', () =>
    gulp
      .src('src/images/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('dist/images'))
);

// Minify js
gulp.task('minify', () => 
    gulp
      .src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
);

// Compile Sass
gulp.task('sass',  () =>
    gulp
      .src('src/sass/*scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
);

// Scripts
gulp.task('scripts', () => 
    gulp
      .src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
);

// Minimize HTML
gulp.task('htmlmin', () =>
    gulp
      .src('src/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'))    
);

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'htmlmin', 'scripts']);

gulp.task('watch', function() { 
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});
 
