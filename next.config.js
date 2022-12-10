/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push( 
      {
        rules: [
          { test: /\.xlsx$/, loader: "webpack-xlsx-loader" }
        ]
      }
    );
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
});