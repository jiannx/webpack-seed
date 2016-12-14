var dirs = require('./base.js');

module.exports = {
    root: dirs.srcRootDir,
    // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
    alias: dirs.alias,
    // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.js')
    extensions: ['', '.js', '.json']
};
