let dirs = require('./base.js');

module.exports = {
  entry: dirs.entry,
  output: dirs.output,
  externals: dirs.externals,
  resolve: require('./resolve.js'),
  module: require('./module.js'),
  plugins: require('./plugins.js')('production'),
  postcss: require('./postcss.js'),
};
