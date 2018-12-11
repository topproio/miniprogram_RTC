const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');
const config = require('../gulp.config');
const eslint = require('gulp-eslint');

const configFile = config.eslint_path

const OPTION = config.script_option
const TARGET_PATH = OPTION.TARGET_PATH.concat(OPTION.IGNORE_PATH.map(i => '!' + i))
const OUTPUT_PATH = config.output_path

gulp.task('script', function() {
    if (!OPTION.init) return;
    
    gulp
        .src(TARGET_PATH)
        //生成的文件名能够和原文件对上
        .pipe(named(function(file) {
            var extnameIndex = file.relative.indexOf('.js');
            return file.relative.slice(0, extnameIndex); // 剔除.js 因为打包后自动会在文件名末尾加js
        }))
        .pipe(gulpWebpack({
            module: {
                rules: [
                    { 
                        test: /\.js$/, 
                        loader: 'babel-loader',
                        exclude: /(node_modules|bower_components)/
                    }
                ]
            }
        }, webpack, function(err, stats) {
            err && console.log(err)
        }))
        .pipe(gulp.dest(OUTPUT_PATH))
})
