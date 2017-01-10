const base = require('./base.js');

module.exports = {
    root: base.srcRootDir,
    alias: base.alias, // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
    extensions: ['', '.js', '.json'], // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.js')
};
