var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var dirs = require('./webpack-config/base.js');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/api': {
            target: dirs.server.host + ':' + dirs.server.port,
            secure: false,
            changeOrigin: true
        }
    }
}).listen(dirs.server.port, 'localhost', function(err, result) {
    if (err) {
        console.error(err);
    }
    console.info('Listening at ' + dirs.server.host + ':' + dirs.server.port);
});
