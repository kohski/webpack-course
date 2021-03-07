const path = require("path");

const outpuPath = path.resolve(__dirname, "dist");
console.log({ outpuPath: outpuPath });

// module = fileと捉えてOK
module.exports = {
  entry: "./src/index.js", // module bundleの対象
  output: {
    path: outpuPath,
    filename: "main.js",
  },
  devServer: {
    contentBase: outpuPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // https://webpack.js.org/concepts/loaders/#loader-features
        // 'A chain is executed in reverse order. '
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
