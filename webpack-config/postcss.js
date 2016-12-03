// css代码处理 autoprefix，样式加前缀
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = [precss, autoprefixer({
    remove: false,
    browsers: ['ie >= 8', '> 1% in CN'],
})];
