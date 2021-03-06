module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
	"crypto": require.resolve('crypto-browserify'),
      }
    }
    return config
  },
}
