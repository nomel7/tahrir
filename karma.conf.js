const {tmpdir} = require("os");
const path = require("path");

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['jasmine', 'webpack'],
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-sourcemap-loader'
        ],
        files: [
            {pattern: 'src/test/**/*test.js'}
        ],
        preprocessors: {
            'src/test/**/*test.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            mode: 'development',
            output: {
                filename: '[name].js',
                path: path.join(tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000),
            },
            module: {
                rules: [
                    { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
                ],
            },
            stats: {
                modules: false,
                colors: true,
            },
            watch: true,
            plugins: []
        }
    });
};