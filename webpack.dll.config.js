var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var dirs = require('./webpack-config/base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    output: {
        path: dirs.dllDir,
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        dll: dirs.dlls,
    },
    resolve: require('./webpack-config/resolve.js'),
    module: require('./webpack-config/module.js'),
    plugins: [
        new CleanPlugin([dirs.dllDir]),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
            context: dirs.rootDir,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new ExtractTextPlugin('[name].css'),
    ],
};
