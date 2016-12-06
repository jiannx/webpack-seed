// css代码处理 autoprefix，样式加前缀
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = [autoprefixer({
    browsers: ['not ie < 8', '> 1%'],
}), precss];
