const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = 3000;
const host = 'localhost';

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:8000',
            secure: false,
            changeOrigin: true
        }
    }
}).listen(port, host, function(err) {
    if (err) {
        console.error(err);
    }
    console.info('Listening at ' + host + ':' + port);
});
