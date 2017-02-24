const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = [autoprefixer({
  browsers: ['not ie < 8', '> 1%'],
}), precss];
