const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    module: {
        rules: [
          { test: /\.xlsx$/, loader: "webpack-xlsx-loader" }
        ]
      },
    // Other rules...
    plugins: [
        new NodePolyfillPlugin()
    ]
}


