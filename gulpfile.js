var gulp           = require('gulp')
var rename         = require('gulp-rename')
var sass           = require('gulp-sass')
var nunjucksRender = require('gulp-nunjucks-render')
var rollup         = require('rollup-stream')
var source         = require('vinyl-source-stream')
var resolve        = require('rollup-plugin-node-resolve')
var commonjs       = require('rollup-plugin-commonjs')
var connect        = require('gulp-connect')
var watch          = require('gulp-watch')

var data           = require('./site-data.json')

gulp.task('html', function(){
  return gulp.src('views/*.njk')
    .pipe(nunjucksRender({
      path: [__dirname, 'views/'],
      data: data
     }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('dist'));
})

gulp.task('scripts', function(){
  return rollup({
      entry: './javascripts/app.js',
      format: 'iife',
      moduleName: 'site',
      external: [
        'bootstrap'
      ],
      globals: {
        bootstrap: 'bootstrap'
      },
      plugins: [
        resolve({ jsnext: true, main: true }),
        commonjs({
          include: [
            'node_modules/**',
            'javascripts/*.js'
          ]
        })
      ]
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/resources/js/'));
})

gulp.task('fonts', function(){
  return gulp.src([
    './node_modules/font-awesome/fonts/fontawesome-webfont.*',
    './node_modules/typeface-arimo/files/arimo-latin-*',
    './node_modules/typeface-overpass/files/overpass-latin-*'
  ])
    .pipe(gulp.dest('dist/resources/fonts/'));
})

gulp.task('styles', function(){
  return gulp.src('./stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/resources/css'));
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['.', 'dist']
  });
});

gulp.task('livereload', function() {
  gulp.src(['dist/**/*'])
    .pipe(watch('dist/**/*'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./javascripts/**/*.js', ['scripts']);
  gulp.watch('./stylesheets/**/*.scss', ['styles']);
  gulp.watch('./views/**/*.njk', ['html']);
});

gulp.task('default', ['html', 'scripts', 'styles', 'fonts', 'webserver', 'livereload', 'watch'])

