/*
用于script标签引入的插件
externals用来将某个全局变量“伪装”成某个js模块的exports, 当调用var $ = require('jquery')的时候，就会把window.jQuery返回给它
 */

module.exports = {
    angular: 'window.angular',
    $: 'window.$',
    jQuery: 'window.$',
    layer: 'window.layer',
};
