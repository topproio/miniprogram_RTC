const gulp = require('gulp');
const eslint = require('gulp-eslint');
const friendlyFormatter = require('eslint-friendly-formatter');
const config = require('../gulp.config.js');

const OUTPUT_PATH = config.target_path
const OPTION = config.eslint_option

const TARGET_PATH = OPTION.TARGET_PATH.concat(OPTION.IGNORE_PATH.map(i => '!' + i))
const configFile = OPTION.configFile

const IS_FIX = process.argv.slice(-1)[0] === '--fix';

gulp.task('eslint', () => {
	if (!OPTION.init) return;
	
    gulp.src(TARGET_PATH)
        .pipe(eslint({
            configFile: configFile,
            fix: IS_FIX
        }))
        .pipe(eslint.format(friendlyFormatter))
        .pipe(IS_FIX ? gulp.dest(OUTPUT_PATH) : process.stdout);
});
