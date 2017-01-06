// 入口文件输出配置
var dirs = require('./base.js');

module.exports = {
    path: dirs.buildDir,
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: '[id]-[name].js',
    // publicPath: '/static/',  //发布时需要添加的绝对路径
};
