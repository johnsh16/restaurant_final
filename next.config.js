const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.optimization.minimizer = [new TerserPlugin({
      parallel: 4
    })]
    config.resolve.fallback = { 
        fs: false,
        replace: false,
        crypto: false,
        querystring: false,
        process: false,
        assert: false,
        util: false
    };
    return config
  }
}
