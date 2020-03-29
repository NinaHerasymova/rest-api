const entry = require('./entry')

module.exports = {
  entry,
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  output: {
    filename: 'index.js',
  },
}
