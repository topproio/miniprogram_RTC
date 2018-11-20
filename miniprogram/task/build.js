const gulp = require('gulp');

const OUTPUT_PATH = 'dist';

const TARGET_STATIC_PATH = [
    'src/**',
];

const TARGET_IGNORE_PATH = [
    '!src/app.less',
    '!src/**/*.less'
];

const TARGET_PATH = TARGET_STATIC_PATH.concat(TARGET_IGNORE_PATH)

gulp.task('build', function() {
    gulp
        .src(TARGET_PATH, { base: 'src' } )
        .pipe(gulp.dest('dist'));
});
