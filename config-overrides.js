const webpack = require('webpack'); // Import Webpack
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    fs: false,
    url: require.resolve('url'),
  };

  if (env === 'development') {
    // Remove any existing ReactRefreshPlugin instances
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ReactRefreshPlugin'
    );

    // Add React Refresh plugin for Fast Refresh in development
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
