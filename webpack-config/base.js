const path = require('path');

let base = {};

// dirs.project = 'angular';
base.project = 'pages';

base.pros = {
    angular: {
        srcDir: './src_angular',
        serverDir: '../mamatuo/console'
    },
    vue: {
        srcDir: './src_vue',
        serverDir: '../mamatuo/web'
    },
    pages: {
        srcDir: './src_pages',
        serverDir: '../mamatuo/web'
    }
};

base.base = base.pros[base.project];
base.rootDir = path.resolve(__dirname, '../'); // 项目根目录
base.srcRootDir = path.resolve(base.rootDir, base.base.srcDir); // 项目业务代码根目录
base.vendorDir = path.resolve(base.rootDir, './vendor'); // 存放所有不能用npm管理的第三方库
base.dllDir = path.resolve(base.rootDir, '.tmp/dll'); // 存放由各种不常改变的js/css打包而来的dll
base.buildDir = path.resolve(base.rootDir, './build'); // 生成文件目录
base.staticDir = path.resolve(base.rootDir, './static'); // 静态文件目录，一些不需要打包的静态资源
base.serverStaticDir = path.resolve(base.rootDir, base.base.serverDir); // 后端的静态目录，gulp发布时将拷贝到该目录

// 文件路径配置
base.path = {
    react: path.resolve(base.rootDir, 'node_modules/react/dist/react.min.js'),
    validation: path.resolve(base.srcRootDir, 'components/angular-validation/angular-validation.min.js')
};


// 模块别名配置
base.alias = {
    'app.config': path.resolve(base.srcRootDir, 'app.config.js'),
    vue$: 'vue/dist/vue.common.js'
};

// 全局变量
base.externals = {
    angular: 'window.angular',
    $: 'window.$',
    jQuery: 'window.$',
    layer: 'window.layer',
    moment: 'window.moment',
    'angular-ui-router': true
};


// 入口，可配置多个
base.entry = {
    app: path.resolve(base.srcRootDir, 'app.js'),
    // home: path.resolve(base.srcRootDir, 'home.js')
};

// 页面配置 直接支持ejs。filename输出文件名；template入口文件；chunks引入的js，对应entry中的key
base.htmls = [
    { filename: 'app.html', template: path.resolve(base.srcRootDir, 'app.html'), chunks: ['app'] },
    // { filename: 'home.html', template: path.resolve(base.srcRootDir, 'home.html'), chunks: ['home'] }
];

// 输出目录
base.output = {
    path: base.buildDir,
    filename: 'js/[name]-[chunkhash:8].js',
    chunkFilename: '[id]-[name].js',
    // publicPath: '/static/',
};


module.exports = base;
