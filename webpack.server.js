var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

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
}).listen(3000, 'localhost', function(err, result) {
    if (err) {
        console.error(err);
    }
    console.info('Listening at http://localhost:3000/');
});
