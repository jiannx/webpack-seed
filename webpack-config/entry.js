// 页面入口文件配置
var path = require('path');
var dirs = require('./base.js');

module.exports = {
    app: path.resolve(dirs.srcRootDir, 'app.js'),
};
