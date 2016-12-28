var path = require('path');

var dirs = {};

// dirs.project = 'angular';
dirs.project = 'vue';

dirs.projectConfig = {
    angular: {
        srcDir: './src_angular',
        serverDir: '../mamatuo/console'
    },
    vue: {
        srcDir: './src_vue',
        serverDir: '../mamatuo/web'
    }
};
dirs.base = dirs.projectConfig[dirs.project];

dirs.rootDir = path.resolve(__dirname, '../'); // 项目根目录
dirs.srcRootDir = path.resolve(dirs.rootDir, dirs.base.srcDir); // 项目业务代码根目录
dirs.vendorDir = path.resolve(dirs.rootDir, './vendor'); // 存放所有不能用npm管理的第三方库
dirs.dllDir = path.resolve(dirs.rootDir, '.tmp/dll'); // 存放由各种不常改变的js/css打包而来的dll
dirs.buildDir = path.resolve(dirs.rootDir, './build'); // 生成文件目录
dirs.staticDir = path.resolve(dirs.rootDir, './static'); // 静态文件目录，一些不需要打包的静态资源
dirs.serverStaticDir = path.resolve(dirs.rootDir, dirs.base.serverDir); // 后端的静态目录，gulp发布时将拷贝到该目录

// 文件目录配置
dirs.path = {
    react: path.resolve(dirs.rootDir, 'node_modules/react/dist/react.min.js'),
    validation: path.resolve(dirs.srcRootDir, 'components/angular-validation/angular-validation.min.js')
};

// 需要打包到dll的库
dirs.dlls = [
    // 'jquery', 'angular'
];

// 打包时不需要解析的文件
dirs.noParse = [
    dirs.path.validation
];

// 模块别名配置
dirs.alias = {
    'app.config': path.resolve(dirs.srcRootDir, 'app.config.js'),
    vue$: 'vue/dist/vue.common.js'
};

// 全局变量
dirs.externals = {
    angular: 'window.angular',
    $: 'window.$',
    jQuery: 'window.$',
    layer: 'window.layer',
    moment: 'window.moment',
    'angular-ui-router': true
};

// dev server 配置
dirs.server = {
    host: 'http://localhost',
    port: 3000,
    proxy: 'http://127.0.0.1:8000'
};


module.exports = dirs;
