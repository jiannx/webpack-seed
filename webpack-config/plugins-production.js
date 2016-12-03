var plugins = require('./plugins.js');
var webpack = require('webpack');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin'); // angular混淆编译

// definePlugin 接收字符串插入到代码当中
var DefinePlugin = new webpack.DefinePlugin({
    IS_PRODUCTION: true,
    // react 发布版本
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
});
// js代码压缩
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
});

var ngAnnotate = new NgAnnotatePlugin({
    add: true,
});

plugins.push(DefinePlugin);
plugins.push(ngAnnotate);
plugins.push(UglifyJsPlugin);


module.exports = plugins;
