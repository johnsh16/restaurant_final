const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  target: 'server',
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
  },
  env: {
    NEXT_PUBLIC_STRIPE_SECRET: 'sk_test_51KQvCmISIBToTlrNuWuTK00aJm8ySQ88woTTF5ee5qtNOBVqF855nJi5oGEFQXBb7G232t5oGe1fLGYWnD51BaoB00t8SmkhgR',
    NEXT_PUBLIC_API_URL: 'http://137.184.149.241:1337',
    NEXT_PUBLIC_STRIPE_PUBLIC: 'pk_test_51KQvCmISIBToTlrNUGZ5akYEYjIMdvkGngvLRwpoV0vJizz9PxV3gIeFdlKfXfApxCcCTyVdXpEkv7GK7fjU262x00A8Ta9Qnf',
    AUTH0_SECRET: '9b6813d784c73250b2e7a4f9c8b4f82e07effdd9757944c6ffe4ff784d6539d5',
    AUTH0_BASE_URL: 'http://143.110.226.0',
    AUTH0_ISSUER_BASE_URL: 'https://dev-7-kf-acw.us.auth0.com',
    AUTH0_CLIENT_ID: 'mosAXIPHorpLylBckpdCVwAmOwOznY7S',
    AUTH0_CLIENT_SECRET: 'uND6bJ03vCDTF90z1H-uL_Ehn7xMkCKSwgfjdtj8S3bB58lys4SATpV56-6ELtQa',
    REDIS_URL: 'redis://143.110.226.0:6379'
  }
}
