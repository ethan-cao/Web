module.exports = {
  mode: 'development',
  watch: true,
  experiments: {
    topLevelAwait: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};