// 开发组件
var webpack = require('webpack');
var path = require('path');
var dirs = require('./base.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 生成独立css
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
var CleanPlugin = require('clean-webpack-plugin'); // 目录清理
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin'); // angular混淆编译
// var pushPlugin = require('./push.js');

var plugins = [];

// 当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块
var providePlugin = new webpack.ProvidePlugin({
    // $: 'jquery',
    // jQuery: 'jquery',
    // 'window.jQuery': 'jquery',
    // 'window.$': 'jquery',
    // 'angular': 'angular',
});

// dll配置文件引入
var dllReferencePlugin = new webpack.DllReferencePlugin({
    context: dirs.rootDir,
    manifest: require('../manifest.json'),
});

// 生成文件夹清空
var cleanPlugin = new CleanPlugin([dirs.buildDir], {
    root: dirs.rootDir,
});

// definePlugin 接收字符串插入到代码当中
var definePluginDev = new webpack.DefinePlugin({
    IS_PRODUCTION: false,
});
var definePluginProduction = new webpack.DefinePlugin({
    IS_PRODUCTION: false,
    // react 发布版本
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
});

// js代码压缩
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
});

// angular 代码依赖注入声明
var ngAnnotate = new NgAnnotatePlugin({
    add: true,
});

plugins = [
    providePlugin,
    new ExtractTextPlugin('[name]-[hash:6].css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: '[name]-[hash:6].js',
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
        { context: dirs.vendorDir, from: '**/*', to: path.resolve(dirs.buildDir, 'vendor') },
        { context: dirs.staticDir, from: '**/*', to: path.resolve(dirs.buildDir, 'static') },
        { context: dirs.dllDir, from: '**/*', to: path.resolve(dirs.buildDir, 'dll') },
    ]),
    // dllReferencePlugin
];

module.exports = function(type = 'dev') {
    console.log('Model: ' + type + ', Project: ' + dirs.project);
    if (type === 'dev') {
        plugins.push(definePluginDev);
    } else if (type === 'production') {
        plugins.push(definePluginProduction);
        plugins.push(ngAnnotate);
        plugins.push(uglifyJsPlugin);
    }
    return plugins;
};
