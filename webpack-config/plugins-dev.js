var plugins = require('./plugins.js');
var webpack = require('webpack');

// definePlugin 接收字符串插入到代码当中
var DefinePlugin = new webpack.DefinePlugin({
    IS_PRODUCTION: false,
});

plugins.push(DefinePlugin);

module.exports = plugins;
