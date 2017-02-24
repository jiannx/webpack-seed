const path = require('path');

let base = {};

// base.project = 'angular';
base.project = 'react';
// base.project = 'vue';
// base.project = 'pages';

base.pros = {
  angular: {
    srcDir: './src_angular',
    serverDir: '../mamatuo/console'
  },
  react: {
    srcDir: './src_react',
    serverDir: '../public'
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
base.rootDir = path.resolve(__dirname, '../');
base.srcRootDir = path.resolve(base.rootDir, base.base.srcDir);
base.vendorDir = path.resolve(base.rootDir, './vendor');
base.dllDir = path.resolve(base.rootDir, '.tmp/dll');
base.buildDir = path.resolve(base.rootDir, './build');
base.staticDir = path.resolve(base.rootDir, './static');
base.serverStaticDir = path.resolve(base.rootDir, base.base.serverDir);

// 文件路径配置
base.path = {
  react: path.resolve(base.rootDir, 'node_modules/react/dist/react.min.js'),
  validation: path.resolve(base.srcRootDir, 'components/angular-validation/angular-validation.min.js')
};

// 模块别名配置
base.alias = {
  'app.config': path.resolve(base.srcRootDir, 'app.config.js'),
  'app.components': path.resolve(base.srcRootDir, 'components/components.js'),
  vue$: 'vue/dist/vue.common.js'
};

// 全局变量
base.externals = {
  angular: 'window.angular',
  $: 'window.$',
  jQuery: 'window.$',
  layer: 'window.layer',
  moment: 'window.moment',
};


// 入口，可配置多个
base.entry = {
  app: path.resolve(base.srcRootDir, 'app.js'),
  // home: path.resolve(base.srcRootDir, 'home.js')
};

// 页面配置 直接支持ejs。filename输出文件名；template入口文件(路径相对于srcRoot)；chunks引入的js，对应entry中的key
base.htmls = [
  { filename: 'index.html', template: 'index.html', chunks: ['app'] },
  // { filename: 'home.html', template: 'home.html', chunks: ['home'] }
];

// 输出目录
base.output = {
  path: base.buildDir,
  filename: 'js/[name]-[chunkhash:8].js',
  chunkFilename: '[id]-[name].js',
  // publicPath: '/',
};


module.exports = base;
