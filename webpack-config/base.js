var path = require('path');


var dirs = {};

/*
'' 空的情况下为最干净的webpack
'angular' angular单页面网站
'react' react单页面网站
'vue' vue单页面网站
'pages' 多页面网站
 */
dirs.project = 'angular';

dirs.rootDir = path.resolve(__dirname, '../'); // 项目根目录
dirs.srcRootDir = path.resolve(dirs.rootDir, './src'); // 项目业务代码根目录
dirs.vendorDir = path.resolve(dirs.rootDir, './vendor'); // 存放所有不能用npm管理的第三方库
dirs.dllDir = path.resolve(dirs.rootDir, '.tmp/dll'); // 存放由各种不常改变的js/css打包而来的dll
dirs.buildDir = path.resolve(dirs.rootDir, './build'); // 生成文件目录
dirs.staticDir = path.resolve(dirs.rootDir, './static'); // 静态文件目录，一些不需要打包的静态资源
dirs.serverStaticDir = path.resolve(dirs.rootDir, '../netease_qs/static'); // 后端的静态目录，gulp发布时将拷贝到该目录

// 库目录配置 不需要解析的文件
dirs.path = {
    react: path.resolve(dirs.rootDir, 'node_modules/react/dist/react.min.js')
};

// 以script形式引入的插件
dirs.outScripts = {

};

// 需要打包到dll的库 TODO
dirs.dlls = [
    // 'jquery', 'angular'
];


module.exports = dirs;
