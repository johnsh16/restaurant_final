

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
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
