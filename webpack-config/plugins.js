const webpack = require('webpack');
const path = require('path');
const base = require('./base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 生成独立css
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
const CleanPlugin = require('clean-webpack-plugin'); // 目录清理
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin'); // angular混淆编译
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // 动态加载lodash模块
const WebpackMd5Hash = require('webpack-md5-hash');

let plugins = [];

// 当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块
let providePlugin = new webpack.ProvidePlugin({
  // $: 'jquery',
  // jQuery: 'jquery',
  // 'window.jQuery': 'jquery',
  // 'window.$': 'jquery',
  // 'angular': 'angular',
});

// dll配置文件引入
let dllReferencePlugin = new webpack.DllReferencePlugin({
  context: base.rootDir,
  manifest: require('../manifest.json'),
});

// 生成文件夹清空
let cleanPlugin = new CleanPlugin([base.buildDir], {
  root: base.rootDir,
});

// definePlugin 接收字符串插入到代码当中
let definePluginDev = new webpack.DefinePlugin({
  PRODUCTION: false,
});

let definePluginProduction = new webpack.DefinePlugin({
  PRODUCTION: true,
  'process.env': {
    NODE_ENV: JSON.stringify('production') // react 发布版本
  },
  'process.env.NODE_ENV': '"production"', // vue
});

// js代码压缩
let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
});

// angular 代码依赖注入声明
let ngAnnotate = new NgAnnotatePlugin({
  add: true,
});

plugins = [
  providePlugin,
  new WebpackMd5Hash(),
  new ExtractTextPlugin('css/[name]-[contenthash:8].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/[name]-[chunkhash:8].js',
  }),
  new CopyWebpackPlugin([
    { context: base.vendorDir, from: '**/*', to: path.resolve(base.buildDir, 'vendor') },
    { context: base.staticDir, from: '**/*', to: path.resolve(base.buildDir, 'static') },
    { context: base.dllDir, from: '**/*', to: path.resolve(base.buildDir, 'dll') },
  ]),
  // new LodashModuleReplacementPlugin(),
  // dllReferencePlugin
];

// htmls
for (let item of base.htmls) {
  plugins.push(new HtmlWebpackPlugin({
    filename: item.filename,
    template: path.resolve(base.srcRootDir, item.template),
    chunks: ['commons'].concat(item.chunks)
  }));
}

module.exports = function(type = 'dev') {
  console.log('Model: ' + type + ', Project: ' + base.project);
  if (type === 'dev') {
    plugins.push(definePluginDev);
  } else if (type === 'production') {
    plugins.push(definePluginProduction);
    plugins.push(ngAnnotate);
    plugins.push(uglifyJsPlugin);
  }
  return plugins;
};
