// 自写插件，webpack打包完成后将build文件夹拷贝到服务器目录
// 先用gulp代替

function pushPlugin(options) {

}

pushPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function(params) {
        // console.log("pushPlugin done!");
    });
    compiler.plugin('emit', function(compilation, callback) {
        callback();
    });
};

module.exports = pushPlugin;
