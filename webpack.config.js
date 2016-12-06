module.exports = {
    entry: require('./webpack-config/entry.js'),

    output: require('./webpack-config/output.js'),

    resolve: require('./webpack-config/resolve.js'),

    module: require('./webpack-config/module.js'),

    plugins: require('./webpack-config/plugins.js')('production'),

    externals: require('./webpack-config/externals.js'),

    postcss: require('./webpack-config/postcss.js'),
};
