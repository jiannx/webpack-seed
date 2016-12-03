// 开发组件
var webpack = require('webpack');
var path = require('path');
var dirs = require('./base.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 生成独立css
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
var CleanPlugin = require('clean-webpack-plugin'); // 目录清理
// var pushPlugin = require('./push.js');


// 当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块
var providePlugin = new webpack.ProvidePlugin({
    // $: 'jquery',
    // jQuery: 'jquery',
    // 'window.jQuery': 'jquery',
    // 'window.$': 'jquery',
    // 'angular': 'angular',
});

var dllReferencePlugin = new webpack.DllReferencePlugin({
    context: dirs.rootDir,
    manifest: require('../manifest.json'),
});

module.exports = [
    providePlugin,
    // new CleanPlugin([dirs.buildDir], {
    //     root: dirs.rootDir,
    // }),
    new ExtractTextPlugin('[name]-[hash:6].css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: '[name]-[hash:6].js',
    }),
    // Also generate a test.html
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
        { from: path.resolve(dirs.rootDir, 'vendor/**/*'), to: path.resolve(dirs.rootDir, 'build') },
        { context: path.resolve(dirs.rootDir, 'static'), from: '**/*', to: path.resolve(dirs.rootDir, 'build/static') },
        { context: path.resolve(dirs.rootDir, '.tmp/dll'), from: '**/*', to: path.resolve(dirs.rootDir, 'build/dll') },
    ]),
    // dllReferencePlugin
];
